-- Seed: sample announcement. Safe to re-run: clears the table first.

delete from announcements;

insert into announcements (title, link_url, link_text, is_active, week_of) values
  ('Register for the Upcoming Parenting Conference!', '#', 'Register', true, current_date);
