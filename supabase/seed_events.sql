-- Seed: sample upcoming events matching the current willohill.com site.
-- NOTE: dates are set to the fall 2026 ministry-year kickoff so they appear
-- as "upcoming" — the church admin will manage real dates in the admin portal.
-- Safe to re-run: clears the table first.

delete from events;

insert into events (title, event_date, event_time, description, location, is_featured) values
  ('Wednesday Morning Bible Study', '2026-09-02', '10:00 AM',
    'Midweek morning Bible study, September through May. All are welcome.',
    'Willo-Hill Baptist Church', false),
  ('AWANA', '2026-09-02', '6:45 PM',
    'AWANA clubs for kids — games, Scripture memory, and fun, September through May.',
    'Willo-Hill Baptist Church', true),
  ('Youth Group', '2026-09-02', '6:45 PM',
    'Wednesday night youth group for middle and high school students.',
    'Willo-Hill Baptist Church', false),
  ('Adult Bible Study with Pastor Dave', '2026-09-02', '7:00 PM',
    'Evening adult Bible study led by Pastor Dave.',
    'Willo-Hill Baptist Church', false),
  ('Volunteer Appreciation', '2026-09-06', '8:00 AM',
    'A morning to celebrate and thank our amazing volunteer teams.',
    'Willo-Hill Baptist Church', false),
  ('Young Adults Meeting Night', '2026-09-06', '6:00 PM',
    'Young adults gathering for food, fellowship, and study.',
    'Various locations', false);
