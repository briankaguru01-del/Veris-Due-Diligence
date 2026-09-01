# Deploying Veris for a new client

This codebase is the single master template for every client. Nothing in the
code is client-specific — every client difference (which database, which
n8n instance) is an environment variable, not a code change. Onboarding a
new client means creating a new deployment of this same repo with its own
settings, not writing new code.

## One-time setup (already done)

The repo lives on GitHub. Every client deployment below connects to the
**same** GitHub repo and branch. That's what makes "edit once, every client
updates" work: a code change pushed to that branch triggers a fresh build on
every connected deployment automatically. Client-specific settings (env
vars) are stored per-deployment, not in the code, so a rebuild never
overwrites them.

## Steps to onboard a new client

1. **Create the client's own Supabase project.** Same schema as the
   existing one (`profiles`, `subscriptions`, `deals`, `checklist_segments`,
   `checklist_findings`, `chat_messages`), same RLS policies. This is a
   separate Supabase project per client — not a shared one.

2. **Set up the client's own n8n workflows.** Copy the master Document
   Processor and Chat Webhook workflows into the client's own n8n instance.
   Inside that workflow (not in the website), set:
   - That client's own Supabase credentials (service role).
   - That client's own Anthropic API key.
   Note the resulting form URL and chat webhook URL — you'll need both in
   step 4.

3. **Create a new Vercel project from this same repo.** In Vercel:
   "Add New Project" → import this same GitHub repository/branch. Give it
   a name/subdomain for the client (e.g. `clientname.veris.app`).

4. **Set that project's environment variables** (Project → Settings →
   Environment Variables, all as **Config**, not Secret, since these are
   `NEXT_PUBLIC_` values that ship to the browser regardless):
   - `NEXT_PUBLIC_SUPABASE_URL` — this client's Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — this client's Supabase anon key
   - `NEXT_PUBLIC_UPLOAD_FORM_URL` — this client's n8n upload form URL (step 2)
   - `NEXT_PUBLIC_CHAT_WEBHOOK_URL` — this client's n8n chat webhook URL (step 2)

5. **Deploy.** That's it — same design, same login flow, same dashboard,
   talking only to this one client's own database and own automation.

## Updating every client at once

Make the code change once, push it to the shared branch. Every client
deployment connected to that branch rebuilds automatically with the fix —
nothing to repeat per client. (This does **not** apply to the n8n workflows
themselves — those still need to be updated per client individually; see
the main onboarding checklist.)

## Important: environment variables are the only thing that differs

No client's Supabase URL, keys, or n8n URLs should ever be committed into
this repo. Every deployment gets its own values set directly in Vercel —
never hardcoded, never checked into git. See the open question in chat
about `.env.production` before onboarding the first real client.
