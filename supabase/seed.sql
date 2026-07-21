-- Seed: staff, ministry team leaders, elders, deacons (from CLAUDE.md)
-- Run after 001_initial_schema.sql. Safe to re-run: clears the table first.

delete from staff;

insert into staff (name, title, role_category, photo_url, email, sort_order) values
  -- Staff (1-6)
  ('Pastor Dave Hackney', 'Teaching & Executive Pastor', 'Staff',
    '/images/pastor-dave.jpg',
    'pastordave@willohill.com', 1),
  ('Pastor Joe Mieden', 'Youth & Young Adult Pastor', 'Staff',
    '/images/pastor-joe.jpg',
    'pastorjoe@willohill.com', 2),
  ('Pastor Rob Mieden', 'Discipleship and Assimilation', 'Staff',
    '/images/pastor-rob.jpg',
    'pastorrob@willohill.com', 3),
  ('Matt Buchanan', 'Director of Worship Ministry', 'Staff',
    '/images/matt-buchanan.jpg',
    null, 4),
  ('Dianne Rocha', 'Custodian', 'Staff', null, null, 5),
  ('Patty Venman', 'Office Manager/Bookkeeper', 'Staff', null, null, 6),

  -- Ministry Team Leaders (7-12)
  ('Bruce Waller', 'AWANA Commander', 'Ministry Team Leaders', null, null, 7),
  ('Katie Ellis', 'Nursery Director', 'Ministry Team Leaders', null, null, 8),
  ('Jason Maynard', 'Sunday Morning Children''s Director', 'Ministry Team Leaders', null, null, 9),
  ('Patty Venman', 'Ladies Ministry', 'Ministry Team Leaders', null, null, 10),
  ('Dave Hudec', 'Men''s Ministry', 'Ministry Team Leaders', null, null, 11),
  ('Matt Buchanan', 'Worship Director', 'Ministry Team Leaders',
    '/images/matt-buchanan.jpg', null, 12),

  -- Elders (13-18)
  ('Pastor Dave Hackney', 'Elder', 'Elders',
    '/images/pastor-dave.jpg',
    'pastordave@willohill.com', 13),
  ('Pastor Joe Mieden', 'Elder', 'Elders',
    '/images/pastor-joe.jpg',
    'pastorjoe@willohill.com', 14),
  ('Pastor Rob Mieden', 'Elder', 'Elders',
    '/images/pastor-rob.jpg',
    'pastorrob@willohill.com', 15),
  ('Walt Cook', 'Elder', 'Elders', null, null, 16),
  ('Jack Ellis', 'Elder', 'Elders', null, null, 17),
  ('Bill Stacy', 'Elder', 'Elders', null, null, 18),

  -- Deacons (19-28)
  ('Greg Brown', 'Deacon', 'Deacons', null, null, 19),
  ('Bob Gartner', 'Deacon', 'Deacons', null, null, 20),
  ('Terry Hager', 'Deacon', 'Deacons', null, null, 21),
  ('Ralph Henry', 'Deacon', 'Deacons', null, null, 22),
  ('John Orosz', 'Deacon', 'Deacons', null, null, 23),
  ('Roger Robbins', 'Deacon', 'Deacons', null, null, 24),
  ('James Davies', 'Deacon', 'Deacons', null, null, 25),
  ('Brandon Cooper', 'Deacon', 'Deacons', null, null, 26),
  ('Jonathan Terry', 'Deacon', 'Deacons', null, null, 27),
  ('Bruce Waller', 'Deacon', 'Deacons', null, null, 28);
