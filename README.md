# JohnnyEdge Limited — Vercel-ready website

Domain target: https://johnnyedgelimited.com

## Deploy
1. Upload this folder/project to Vercel.
2. Deploy.
3. Vercel → Project → Settings → Domains → add `johnnyedgelimited.com` and `www.johnnyedgelimited.com`.
4. At Namecheap → Domain List → Manage → Advanced DNS, enter the exact DNS records Vercel shows for your project.
5. Keep existing email-related MX/TXT records if you use email on the domain.

## Supabase quote storage
1. Create a Supabase project.
2. Open SQL Editor and run `supabase-schema.sql`.
3. Copy the Project URL and publishable key.
4. Replace `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_PUBLISHABLE_KEY` in `index.html`.
5. Redeploy.

Security note: only the Supabase publishable/anon key belongs in browser code. Never put a Supabase service-role/secret key in `index.html`.

## Current fallback
Before Supabase is configured, quote submissions open a prefilled WhatsApp message to JohnnyEdge Limited.

## Analytics
The site includes an event hook (`track()`) for `quote_started`, `quote_submitted`, and `whatsapp_click`. Add your Google Analytics/GTM measurement code when you have the property ID.

## QR target
Recommended QR destination:
https://johnnyedgelimited.com/?source=qr

## Contact
WhatsApp: +2349163571445
Email: johnnyedgelimited@gmail.com
