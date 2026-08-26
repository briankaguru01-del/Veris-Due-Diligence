# Veris

Client-facing front end for Veris — an AI-powered due diligence platform for
Financial Services & Fintech M&A deals in Africa (Kenya first). This app
handles accounts, the dashboard, starting new deals, and displaying results.
All document analysis happens in a separate n8n backend; this app only reads
and writes to Supabase and calls two n8n webhooks.

## Stack

- Next.js (App Router) on Vercel
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Supabase for auth, database, and Realtime — schema and RLS already live,
  this app does not create or modify tables/policies

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

### Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (safe for client-side use — RLS enforces access) |
| `NEXT_PUBLIC_UPLOAD_FORM_URL` | n8n data-room upload form, redirected to from `/deals/new` |
| `NEXT_PUBLIC_CHAT_WEBHOOK_URL` | n8n webhook that receives chat questions from `/deals/[id]` |

Set the same variables in the Vercel project settings for deployed
environments.

## Payment gate

Every protected page checks for a session and, only if `REQUIRE_PAYMENT` in
`lib/config.ts` is `true`, an active subscription. It's currently `false` —
flip that single flag when billing is ready to enforce.

## Deployment

Deploys to Vercel with zero extra configuration beyond the environment
variables above (`vercel.json` pins the framework and build command).
Run `npm run build` before shipping changes to confirm the production build
is clean.
