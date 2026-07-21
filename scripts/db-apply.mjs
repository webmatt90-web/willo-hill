// Applies supabase/migrations + seed files to the database in SUPABASE_DB_URL.
// Loads .env.local itself so credentials never appear in terminal output.
// Usage: npm run db:apply [-- --seeds-only]
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

function loadEnvLocal() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && !(match[1] in process.env)) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

async function tableExists(client, table) {
  const { rows } = await client.query("select to_regclass($1) as reg", [
    `public.${table}`,
  ]);
  return rows[0].reg !== null;
}

/**
 * The "direct connection" host (db.<ref>.supabase.co) is IPv6-only, which
 * fails on networks without IPv6 (e.g. WSL). Derive pooler candidates
 * (IPv4-friendly) from the same URL and try those too.
 */
function connectionCandidates(url) {
  const candidates = [url];
  const match = url.match(/^postgres(?:ql)?:\/\/postgres:([^@]+)@db\.([a-z0-9]+)\.supabase\.co:\d+\/postgres/);
  if (match) {
    const [, password, ref] = match;
    for (const cluster of ["aws-1", "aws-0"]) {
      for (const region of ["us-east-2", "us-east-1"]) {
        for (const port of [5432, 6543]) {
          candidates.push(
            `postgresql://postgres.${ref}:${password}@${cluster}-${region}.pooler.supabase.com:${port}/postgres`
          );
        }
      }
    }
  }
  return candidates;
}

async function connect(url) {
  let lastError;
  for (const candidate of connectionCandidates(url)) {
    const client = new pg.Client({
      connectionString: candidate,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 8000,
    });
    try {
      await client.connect();
      const host = new URL(candidate.replace(/^postgres(ql)?:/, "http:")).hostname;
      console.log(`Connected via ${host}`);
      return client;
    } catch (err) {
      lastError = err;
      await client.end().catch(() => {});
    }
  }
  throw lastError;
}

async function main() {
  loadEnvLocal();
  const url = process.env.SUPABASE_DB_URL;
  if (!url) {
    console.error("SUPABASE_DB_URL is not set in .env.local — aborting.");
    console.error("Copy it from Supabase Dashboard → Connect → URI.");
    process.exit(1);
  }

  const client = await connect(url);

  try {
    const seedsOnly = process.argv.includes("--seeds-only");

    if (!seedsOnly) {
      if (await tableExists(client, "events")) {
        console.log("Schema already applied — skipping migration.");
      } else {
        const sql = readFileSync(
          "supabase/migrations/001_initial_schema.sql",
          "utf8"
        );
        await client.query(sql);
        console.log("Migration applied: 001_initial_schema.sql");
      }
    }

    for (const file of [
      "supabase/seed.sql",
      "supabase/seed_events.sql",
      "supabase/seed_announcements.sql",
    ]) {
      await client.query(readFileSync(file, "utf8"));
      console.log(`Seed applied: ${file}`);
    }

    for (const table of ["staff", "events", "announcements"]) {
      const { rows } = await client.query(`select count(*) from ${table}`);
      console.log(`${table}: ${rows[0].count} rows`);
    }

    // Security gate: every public table must have RLS enabled + policies.
    const { rows: rls } = await client.query(`
      select c.relname as table,
             c.relrowsecurity as rls_enabled,
             count(p.polname)::int as policies
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      left join pg_policy p on p.polrelid = c.oid
      where n.nspname = 'public' and c.relkind = 'r'
      group by c.relname, c.relrowsecurity
      order by c.relname
    `);
    let insecure = false;
    for (const row of rls) {
      const ok = row.rls_enabled && row.policies > 0;
      if (!ok) insecure = true;
      console.log(
        `${ok ? "✓" : "✗ INSECURE"} ${row.table}: RLS ${row.rls_enabled ? "on" : "OFF"}, ${row.policies} policies`
      );
    }
    if (insecure) {
      console.error("SECURITY GATE FAILED — table(s) without RLS/policies.");
      process.exit(2);
    }
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("db-apply failed:", err.message);
  process.exit(1);
});
