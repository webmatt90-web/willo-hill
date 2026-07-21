# CLAUDE.md — Willo-Hill Baptist Church Website

## Project Overview
This is a full rebuild of willohill.com using the Web Launch Academy (WLA) methodology.
The goal is to replace a $200/month WordPress site with an owned, code-first Next.js site
that the church controls forever — zero platform lock-in.

## Tech Stack
| Layer | Service | Purpose |
|---|---|---|
| Framework | Next.js 14 (App Router) | Site framework |
| Styling | Tailwind CSS | Utility-first styling |
| Database | Supabase (PostgreSQL) | Dynamic content (events, sermons, staff, announcements) |
| Auth | Supabase Auth | Admin portal login |
| Email | Resend | Visit form, prayer requests, contact form confirmations |
| Donations | Zeffy (iframe embed) | 100% fee-free giving for nonprofit |
| Hosting | Vercel | Deployment + ISR |
| Domain | Namecheap | DNS + private email |
| Repo | GitHub | Source control |

## Brand Design System
- **Primary Dark:** `#1B2A4A` (navy blue — section backgrounds, nav)
- **Accent Yellow:** `#F5A623` (buttons, dot accents, announcement bar)
- **White:** `#FFFFFF` (light section backgrounds, text on dark)
- **Font:** Use Google Fonts — `Oswald` for headings (bold/italic), `Open Sans` for body
- **Button style:** Yellow bg, dark navy text, uppercase, rounded-sm, px-6 py-3
- **Section pattern:** Alternating dark navy ↔ white sections
- **Accent graphic:** SVG dot-cluster decoration, bottom-right of dark sections
  - Source: `https://willohill.com/wp-content/uploads/2024/02/WHACCENTS-HALF-RIGHT-YELLOW-1-01.svg`
- **Logo (color):** `https://willohill.com/wp-content/uploads/2024/02/WillowHill_Logo_Color.svg`
- **Logo (white):** `https://willohill.com/wp-content/uploads/2024/02/WillowHill_Logo_WHITE.svg`

## Hero Slider Images (hosted on their WP server — church will supply final assets)
- `https://willohill.com/wp-content/uploads/2025/11/IMG_0750-1024x683.jpg`
- `https://willohill.com/wp-content/uploads/2025/11/IMG_0673-1024x683.jpg`
- `https://willohill.com/wp-content/uploads/2025/11/IMG_0699-1024x683.jpg`
- `https://willohill.com/wp-content/uploads/2025/11/IMG_0625-1024x683.jpg`

## Supabase Database Schema

### `announcements`
```sql
id uuid primary key default gen_random_uuid()
title text not null
content text
link_url text
link_text text
is_active boolean default true
week_of date
created_at timestamptz default now()
```

### `events`
```sql
id uuid primary key default gen_random_uuid()
title text not null
event_date date not null
event_time text
description text
location text
is_featured boolean default false
created_at timestamptz default now()
```

### `sermons`
```sql
id uuid primary key default gen_random_uuid()
title text not null
sermon_date date not null
pastor text
series_name text
youtube_url text
thumbnail_url text
created_at timestamptz default now()
```

### `staff`
```sql
id uuid primary key default gen_random_uuid()
name text not null
title text not null
role_category text not null  -- 'Staff' | 'Ministry Team Leaders' | 'Elders' | 'Deacons'
photo_url text
email text
sort_order int default 0
created_at timestamptz default now()
```

### `prayer_requests`
```sql
id uuid primary key default gen_random_uuid()
name text not null
email text
request text not null
is_public boolean default false
created_at timestamptz default now()
```

### `visit_registrations`
```sql
id uuid primary key default gen_random_uuid()
visit_date text
first_name text not null
last_name text not null
email text not null
phone text
bringing_kids boolean default false
other_adult_name text
needs_ride boolean default false
pickup_address text
wants_host boolean default false
coffee_order text
children jsonb  -- array of {name, age, allergies}
created_at timestamptz default now()
```

## Site Structure / Pages
```
app/
  page.tsx                    # Home
  layout.tsx                  # Root layout (nav + footer)
  new/page.tsx                # New Here?
  visit/page.tsx              # Plan A Visit (multi-step form)
  next/page.tsx               # Next Steps
  connect/page.tsx            # Connect (card grid hub)
  about/page.tsx              # About
  leadership/page.tsx         # Leadership (Supabase-powered)
  contact/page.tsx            # Contact
  app/page.tsx                # App download page
  sermons/page.tsx            # Sermon archive (YouTube + Supabase)
  live/page.tsx               # Live stream (YouTube embed)
  kids/page.tsx               # Kids ministry
  youth/page.tsx              # Youth ministry
  family/page.tsx             # Family ministry
  next/page.tsx               # Next Steps / spiritual journey
  jesus/page.tsx              # Meet Jesus
  baptism/page.tsx            # Baptism info
  music/page.tsx              # Worship music
  groups/page.tsx             # LifeGroups
  events/page.tsx             # Events (Supabase-powered)
  missions/page.tsx           # Missions
  internships/page.tsx        # Internships
  teams/page.tsx              # Volunteer teams
  give/page.tsx               # Give (Zeffy embed)
  admin/
    page.tsx                  # Admin dashboard (protected)
    login/page.tsx            # Admin login
    events/page.tsx           # Manage events
    sermons/page.tsx          # Manage sermons
    staff/page.tsx            # Manage staff
    announcements/page.tsx    # Manage announcements
```

## Key Patterns to Follow

### ISR (Incremental Static Regeneration)
All Supabase-powered pages must use ISR so the page is cached as static HTML and
only re-fetches from Supabase when content changes — not on every visitor request.
```ts
export const revalidate = 60 // seconds
```

### Environment Variables (.env.local)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://willohill.com
```

### Admin Auth Pattern
- Supabase Auth with email/password
- Single admin user account (church office manager)
- Protect all `/admin/*` routes with a middleware check
- Redirect to `/admin/login` if not authenticated

### Form Submission Pattern
All forms (visit, prayer, contact) should:
1. POST to a Next.js API route (`/api/[form-name]`)
2. Insert into Supabase
3. Send confirmation email via Resend to the submitter
4. Send notification email via Resend to the church office

### Zeffy Integration
The Give page uses a Zeffy iframe embed — no Stripe, no fees.
Zeffy is free for nonprofits; church keeps 100% of donations.
Embed example:
```html
<iframe
  src="https://www.zeffy.com/en-US/embed/donation-form/[CHURCH_FORM_ID]"
  style="width:100%;border:none;min-height:600px;"
  allowpaymentrequest
/>
```
Church staff creates the Zeffy account and provides the form ID.

## Existing Staff Data (seed this into Supabase)
### Staff
- Pastor Dave Hackney — Teaching & Executive Pastor — pastordave@willohill.com
- Pastor Joe Mieden — Youth & Young Adult Pastor — pastorjoe@willohill.com
- Pastor Rob Mieden — Discipleship and Assimilation — pastorrob@willohill.com
- Matt Buchanan — Director of Worship Ministry
- Dianne Rocha — Custodian
- Patty Venman — Office Manager/Bookkeeper

### Ministry Team Leaders
- Bruce Waller — AWANA Commander
- Katie Ellis — Nursery Director
- Jason Maynard — Sunday Morning Children's Director
- Patty Venman — Ladies Ministry
- Dave Hudec — Men's Ministry
- Matt Buchanan — Worship Director

### Elders
- Pastor Dave Hackney, Pastor Joe Mieden, Pastor Rob Mieden
- Walt Cook, Jack Ellis, Bill Stacy

### Deacons
- Greg Brown, Bob Gartner, Terry Hager, Ralph Henry, John Orosz,
  Roger Robbins, James Davies, Brandon Cooper, Jonathan Terry, Bruce Waller

## Service Times
**Sundays:**
- 9:30 am — Youth Sunday School & Adult Classes
- 10:45 am — Worship Service (Nursery provided for both)

**Wednesdays (September–May):**
- 10:00 am — Morning Bible Study
- 6:45 pm — AWANA
- 6:45 pm — Youth Group
- 7:00 pm — Evening Bible Study

## Contact Info
- Address: 4200 State Route 306, Willoughby, OH 44094
- Phone: (440) 488-4024 (Call or Text)
- Facebook, Instagram, YouTube social links

## Coding Standards
- TypeScript everywhere — no `any` types
- Use `shadcn/ui` for form components and UI primitives where appropriate
- All images use Next.js `<Image />` component with proper width/height
- Mobile-first responsive design — hamburger nav on mobile
- Accessibility: all interactive elements must have proper ARIA labels
- No inline styles — Tailwind classes only
- Component files in `components/` folder, organized by section
- API routes in `app/api/`

## What We Are NOT Building
- No WordPress, no page builder plugins
- No Stripe (Zeffy handles donations fee-free)
- No Tithe.ly or external church platform subscription
- No sermon hosting (YouTube does this for free)
- No event plugin (Supabase replaces this)
- No monthly platform fee of any kind
