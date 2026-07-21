# Pre-Launch Checklist — Willo-Hill Baptist Church

## Database (Supabase project `xifpohfvztdzvpugxzrj`)
- [ ] Rename `env.local` → `.env.local` (`mv env.local .env.local`)
- [ ] Run `npm run db:apply` — applies schema (with RLS security gate) + seeds
      (28 staff, 6 events, 1 announcement). Or paste the files from
      `supabase/` into the dashboard SQL editor (see `supabase/README.md`).
- [ ] Create the admin user in Supabase Auth (Authentication → Users →
      Add user → Auto Confirm). This is Patty Venman's login for `/admin`.
- [ ] Verify Security Advisor shows no issues (Dashboard → Advisors)

## Email (Resend)
- [ ] Create a Resend account and add `RESEND_API_KEY` to `.env.local`
- [ ] Verify the `willohill.com` domain in Resend (SPF + DKIM DNS records)
- [ ] Set `RESEND_FROM_EMAIL` (e.g. `Willo-Hill Church <hello@willohill.com>`)
- [ ] Optionally set `CHURCH_NOTIFICATION_EMAIL` (defaults to
      pastordave@willohill.com)
- [ ] Test all three forms end to end (visit, prayer, contact)

## Giving (Zeffy)
- [ ] Church creates a free nonprofit account at zeffy.com
- [ ] Replace `PLACEHOLDER_ID` in `app/give/page.tsx` with the real form ID

## Live stream
- [ ] Replace `PLACEHOLDER_CHANNEL_ID` in `app/live/page.tsx` with the
      church's YouTube channel ID

## Vercel (deployed 2026-07-21: https://willo-hill-matthew-ellis-projects.vercel.app)
- [ ] Disable Deployment Protection so the site is publicly viewable
      (Project → Settings → Deployment Protection → Vercel Authentication → Disabled)
- [ ] Set all environment variables in Vercel (Project → Settings →
      Environment Variables); mark `SUPABASE_SECRET_KEY`, `SUPABASE_DB_URL`,
      and `RESEND_API_KEY` as Sensitive — then redeploy
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://willohill.com` in Production
- [ ] Smoke-test the deployed URL
- [ ] Test admin login + all CRUD operations on the deployment

## Content
- [ ] Add real social media URLs in `components/layout/Footer.tsx`
      (current links are best guesses)
- [ ] Replace placeholder favicon (`app/icon.tsx` / `app/apple-icon.tsx`)
      with real church logo favicon files
- [ ] Add the first real sermons in `/admin/sermons`
- [ ] Review seeded event dates in `/admin/events` (set to Sept 2026 kickoff)
- [ ] Publish the current weekly announcement in `/admin/announcements`

## DNS cutover (Namecheap)
- [ ] Point `willohill.com` A/CNAME records to Vercel
- [ ] Confirm the old WordPress hosting can be cancelled ($200/mo → $0)
- [ ] Keep WP export/backup until the new site has been live for 30 days

## Post-launch
- [ ] Test on a real mobile device (not just browser devtools)
- [ ] Submit `https://willohill.com/sitemap.xml` to Google Search Console
- [ ] Verify visit/prayer/contact emails arrive (check spam folder too)
- [ ] Walk Patty Venman through the admin portal
