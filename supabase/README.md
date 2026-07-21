# Supabase Setup — Willo-Hill Baptist Church

Manual steps to provision the database. Do these once, in order.

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project.
2. Name it `willo-hill` (any region near Ohio, e.g. `us-east-1`).
3. Save the database password somewhere safe (you won't need it day-to-day).
4. From **Project Settings → API**, copy into `.env.local` (and later into Vercel):
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never expose)

## 2. Run the migration

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the full contents of `migrations/001_initial_schema.sql`.
3. Click **Run**. It creates all 6 tables with Row Level Security enabled
   and all policies in place.
4. Verify under **Table Editor** that all 6 tables exist and each shows
   "RLS enabled".

## 3. Run the seed files

In the SQL Editor, run each of these (in any order):

1. `seed.sql` — all 28 staff/leader/elder/deacon records
2. `seed_events.sql` — 6 sample upcoming events (dates set to the fall 2026
   kickoff; edit real dates in the admin portal later)
3. `seed_announcements.sql` — one sample active announcement

Each file deletes its table's rows first, so they are safe to re-run.

## 4. Create the admin user

1. Dashboard → **Authentication → Users → Add user → Create new user**.
2. Email: the church office manager's email (Patty Venman).
3. Set a strong password and check **Auto Confirm User**.
4. That's the only account needed — the site's `/admin/login` page uses it.

## 5. Verify security

After any schema change, check **Advisors → Security Advisor** in the
dashboard (or ask Claude to run `get_advisors`) and fix anything it reports.
