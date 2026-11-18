# Talent Bridge Website

Next.js 14 (App Router) + Supabase (database + private file storage) + Resend (email). Deploys on Vercel.

## 1. Supabase setup (free)
1. Create a project at supabase.com.
2. SQL Editor: paste and run `supabase/schema.sql` (creates tables and the private `uploads` bucket).
3. Project Settings > API: copy the Project URL and the `service_role` key.

## 2. Email (Resend)
1. Create an account at resend.com, verify your domain, create an API key.
2. Set `MAIL_FROM` to an address on that domain and `NOTIFY_TO` to the inbox(es) that should get alerts.

## 3. Spam protection (optional, recommended)
Create a free Cloudflare Turnstile widget and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET`.
Honeypot field and rate limiting are always on.

## 4. Run locally
```
cp .env.example .env.local   # fill in values
npm install
npm run dev
```

## 5. Deploy on Vercel
1. Push this folder to a GitHub repo.
2. vercel.com > Add New > Project > import the repo (framework is detected as Next.js).
3. Add every variable from `.env.example` under Settings > Environment Variables.
4. Deploy, then add your domain `talentbridgehr.online` under Settings > Domains.

## Admin panel
Go to `/admin`. Log in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Use a long random `ADMIN_SECRET`.
Features: company enquiries, candidate registrations (search, filter, status), resume/JD download,
job listings (add, hide, delete), contact enquiries.

## Notes
- Uploads: PDF/DOC/DOCX only, max 4 MB (Vercel's request body limit is about 4.5 MB). Files are type-checked by content and stored in a private bucket; admin downloads use 60-second signed links.
- Rate limiting is in-memory per server instance; Turnstile gives the stronger protection.
- Before launch: replace placeholder WhatsApp number in env, and add your real logo and company details.
