# Tiri-Tara — Static site

This repository contains a static HTML site in the `src/` folder.

Quick deploy to Vercel

Prerequisites

- A Vercel account (https://vercel.com)
- Optionally the Vercel CLI (`npm i -g vercel`)

Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import this repository from GitHub (or connect your Git provider).
3. For the "Root Directory" set it to `/` (the `vercel.json` routes `src/` automatically).
4. Deploy.

Deploy via CLI (PowerShell)

# 1) Install Vercel CLI if needed

npm i -g vercel

# 2) From the repository root

cd "f:/Tiri Tara"
vercel --prod

Notes

- The `vercel.json` uses the static builder and routes all incoming requests to files inside `src/`.
- If you'd prefer, you can move the contents of `src/` into the repository root and remove the custom routes.
