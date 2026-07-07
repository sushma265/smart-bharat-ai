# Deployment Guide

## Prerequisites

- A [Gemini API key](https://aistudio.google.com/apikey)
- Node.js 20+ on your build/host environment

## Environment variables

Set these in your hosting platform's environment variable settings
(see [`.env.example`](../.env.example)):

| Variable | Required | Notes |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Keep secret — never commit it, never prefix it with `NEXT_PUBLIC_`. |
| `GEMINI_MODEL` | No | Defaults to `gemini-1.5-flash` if unset. |

## Deploying to Vercel (recommended)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add `GEMINI_API_KEY` (and optionally `GEMINI_MODEL`) under
   **Project Settings → Environment Variables**.
4. Deploy. Vercel runs `pnpm install && pnpm build` automatically and detects
   the Next.js framework — no custom build command needed.

The two AI routes (`/api/assistant`, `/api/schemes`, `/api/documents`) run on
the Node.js runtime (`export const runtime = 'nodejs'`) and work on Vercel's
serverless functions out of the box.

## Deploying elsewhere (Docker / self-hosted Node)

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "start"]
```

Build and run:

```bash
docker build -t smart-bharat-ai .
docker run -p 3000:3000 -e GEMINI_API_KEY=your-key smart-bharat-ai
```

Because fonts are self-hosted (`@fontsource`, not `next/font/google`), the
build has **no external network dependency** — it works behind a restrictive
corporate proxy or in an air-gapped CI runner, which matters if you're
deploying inside a government/internal network with locked-down egress.

## Multi-instance / high-traffic deployments

`lib/rate-limit.ts` uses an in-memory token bucket. This is correct for a
single instance but **each serverless/container instance keeps its own
buckets**, so the effective rate limit multiplies by however many warm
instances are handling traffic. Before scaling horizontally, swap it for a
shared store such as Upstash Redis:

```ts
// lib/rate-limit.ts — sketch, not implemented
import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()
// replace the in-memory Map with redis INCR + EXPIRE per key
```

## Pre-deploy checklist

Run these locally before every deploy — they are exactly what CI should run:

```bash
pnpm install
pnpm lint
npx tsc --noEmit
pnpm build
```

All four currently pass with zero errors and zero warnings.

## Post-deploy smoke test

Visit these routes and confirm each returns `200` and renders correctly:

- `/`
- `/dashboard`
- `/dashboard/assistant` — send a message, confirm the reply streams in
- `/dashboard/schemes` — submit the form, confirm scheme cards render
- `/dashboard/documents` — submit a service name, confirm the guide renders
