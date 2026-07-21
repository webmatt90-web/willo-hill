-- Willo-Hill Baptist Church — initial schema
-- RLS is enabled in this same migration for every table (WLA hard gate).
-- Access model: single admin user (church office manager) via Supabase Auth.
--   * anon (public site) reads published content only
--   * authenticated (admin) has full read/write
--   * form submissions are inserted server-side with the service role key,
--     so no anon INSERT policies are granted.

-- ─────────────────────────────────────────────
-- announcements
-- ─────────────────────────────────────────────
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  link_url text,
  link_text text,
  is_active boolean default true,
  week_of date,
  created_at timestamptz default now()
);

alter table announcements enable row level security;

create policy "Public can read active announcements"
  on announcements for select to anon
  using (is_active = true);

create policy "Admin can read all announcements"
  on announcements for select to authenticated
  using (true);

create policy "Admin can insert announcements"
  on announcements for insert to authenticated
  with check (true);

create policy "Admin can update announcements"
  on announcements for update to authenticated
  using (true) with check (true);

create policy "Admin can delete announcements"
  on announcements for delete to authenticated
  using (true);

-- ─────────────────────────────────────────────
-- events
-- ─────────────────────────────────────────────
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  event_time text,
  description text,
  location text,
  is_featured boolean default false,
  created_at timestamptz default now()
);

alter table events enable row level security;

create policy "Public can read events"
  on events for select
  using (true);

create policy "Admin can insert events"
  on events for insert to authenticated
  with check (true);

create policy "Admin can update events"
  on events for update to authenticated
  using (true) with check (true);

create policy "Admin can delete events"
  on events for delete to authenticated
  using (true);

-- ─────────────────────────────────────────────
-- sermons
-- ─────────────────────────────────────────────
create table sermons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  sermon_date date not null,
  pastor text,
  series_name text,
  youtube_url text,
  thumbnail_url text,
  created_at timestamptz default now()
);

alter table sermons enable row level security;

create policy "Public can read sermons"
  on sermons for select
  using (true);

create policy "Admin can insert sermons"
  on sermons for insert to authenticated
  with check (true);

create policy "Admin can update sermons"
  on sermons for update to authenticated
  using (true) with check (true);

create policy "Admin can delete sermons"
  on sermons for delete to authenticated
  using (true);

-- ─────────────────────────────────────────────
-- staff
-- ─────────────────────────────────────────────
create table staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  title text not null,
  role_category text not null, -- 'Staff' | 'Ministry Team Leaders' | 'Elders' | 'Deacons'
  photo_url text,
  email text,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table staff enable row level security;

create policy "Public can read staff"
  on staff for select
  using (true);

create policy "Admin can insert staff"
  on staff for insert to authenticated
  with check (true);

create policy "Admin can update staff"
  on staff for update to authenticated
  using (true) with check (true);

create policy "Admin can delete staff"
  on staff for delete to authenticated
  using (true);

-- ─────────────────────────────────────────────
-- prayer_requests (sensitive — no public read)
-- ─────────────────────────────────────────────
create table prayer_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  request text not null,
  is_public boolean default false,
  created_at timestamptz default now()
);

alter table prayer_requests enable row level security;

create policy "Admin can read prayer requests"
  on prayer_requests for select to authenticated
  using (true);

create policy "Admin can insert prayer requests"
  on prayer_requests for insert to authenticated
  with check (true);

create policy "Admin can update prayer requests"
  on prayer_requests for update to authenticated
  using (true) with check (true);

create policy "Admin can delete prayer requests"
  on prayer_requests for delete to authenticated
  using (true);

-- ─────────────────────────────────────────────
-- visit_registrations (sensitive — no public read)
-- ─────────────────────────────────────────────
create table visit_registrations (
  id uuid primary key default gen_random_uuid(),
  visit_date text,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  bringing_kids boolean default false,
  other_adult_name text,
  needs_ride boolean default false,
  pickup_address text,
  wants_host boolean default false,
  coffee_order text,
  children jsonb, -- array of {name, age, allergies}
  created_at timestamptz default now()
);

alter table visit_registrations enable row level security;

create policy "Admin can read visit registrations"
  on visit_registrations for select to authenticated
  using (true);

create policy "Admin can insert visit registrations"
  on visit_registrations for insert to authenticated
  with check (true);

create policy "Admin can update visit registrations"
  on visit_registrations for update to authenticated
  using (true) with check (true);

create policy "Admin can delete visit registrations"
  on visit_registrations for delete to authenticated
  using (true);
