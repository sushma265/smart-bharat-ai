# Architecture

## Overview

Smart Bharat AI is a server-rendered Next.js App Router application. There is
no database and no authentication — every feature is a stateless request that
calls the Gemini API on the server and returns either a streamed text
response (Civic Assistant) or a structured JSON object (Scheme Finder,
Document Assistant).

```
┌─────────────┐      fetch()       ┌──────────────────┐      Gemini API      ┌────────────┐
│   Client    │ ─────────────────▶ │  Next.js Route    │ ───────────────────▶ │   Gemini    │
│ (React 19)  │ ◀───────────────── │  Handler (Node)   │ ◀─────────────────── │   models    │
└─────────────┘   stream / JSON    └──────────────────┘     stream / JSON     └────────────┘
```

## Request flow per feature

### Civic Assistant (`/dashboard/assistant`)
1. `ChatComposer` collects a message; `useChat` appends it to local state and
   POSTs the full message history + language to `POST /api/assistant`.
2. The route validates the payload (`assistantRequestSchema`), rate-limits by
   client IP, converts history into Gemini's `Content[]` shape, and opens a
   streaming chat session (`streamChat` in `services/gemini/generate.ts`).
3. Each text chunk is piped directly to the client as a raw `text/plain`
   stream; `useChat` reads it with `ReadableStream.getReader()` and updates
   the last message incrementally, producing the token-by-token typing effect.

### Scheme Finder (`/dashboard/schemes`) & Document Assistant (`/dashboard/documents`)
1. A form (`SchemeForm` / `DocumentForm`) validates input client-side with the
   same Zod schema used server-side, then calls a dedicated hook
   (`useSchemeFinder` / `useDocumentGuide`) that POSTs to `/api/schemes` or
   `/api/documents`.
2. The route validates again server-side (never trust the client), rate-limits,
   and calls `generateStructured()`, which asks Gemini to return JSON matching
   an explicit `ResponseSchema` (`services/gemini/schemas.ts`). Gemini's
   structured-output mode guarantees the shape, so the route can safely
   `JSON.parse()` and return it directly.
3. The page renders a loading skeleton while the request is in flight, an
   `ErrorState` with a retry button on failure, and the results (a grid of
   `SchemeCard`s, or a `DocumentGuideView`) on success.

## State management

There is no global state library. State is either:
- **Local component state** (chat messages, form fields, request status) — a
  `status: 'idle' | 'loading' | 'success' | 'error'` pattern is used
  consistently across `useChat`, `useSchemeFinder`, and `useDocumentGuide`.
- **A single React Context** (`LanguageProvider`) for the selected UI/response
  language, persisted to `localStorage` and read via `useSyncExternalStore` so
  the value is correct on first paint without a `setState`-in-`useEffect`
  render cascade, and stays in sync across browser tabs.

## Styling system

Tailwind CSS v4 with a CSS-first theme (`@theme inline` in `app/globals.css`).
Design tokens (colors, radii, fonts) are defined once as CSS custom properties
in OKLCH and consumed everywhere via Tailwind utility classes — there is no
JS-based theme object. Fonts (Inter, Lora) are self-hosted via `@fontsource`
packages rather than `next/font/google`, so the production build has no
external network dependency and works in restricted/offline CI environments.

UI primitives (`components/ui/*`) follow the shadcn "new-york"-style pattern
but are built on [Base UI](https://base-ui.com/) rather than Radix — most
primitives accept a `render` prop for polymorphic composition
(e.g. `<Button render={<Link href="/dashboard" />}>`).

## Security posture

- **Server-only secrets:** `services/gemini/client.ts` imports the
  `server-only` package, which throws a build error if accidentally imported
  from a Client Component — the Gemini API key can never end up in the
  browser bundle.
- **Input validation:** every API route validates its payload with Zod before
  doing anything else.
- **Rate limiting:** a simple in-memory token-bucket limiter
  (`lib/rate-limit.ts`) throttles each route per client IP. This is
  appropriate for a single-instance deployment; for multi-instance production
  traffic, swap it for a shared store (e.g. Upstash Redis) since each
  serverless instance otherwise keeps its own bucket.
- **HTTP security headers:** `next.config.mjs` sets a `Content-Security-Policy`,
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, and a restrictive `Permissions-Policy` on every response.
- **No `ignoreBuildErrors`:** the production build fails on real TypeScript
  errors rather than silently shipping them.

## Known limitations / where to take this next

- No persistence layer — chat history and results are lost on refresh. Adding
  a database (e.g. Postgres via Prisma, or a KV store) would enable saved
  chats, saved scheme searches, and user accounts.
- No authentication — every feature is fully public. Fine for the current
  scope; would need adding before storing any per-user data.
- Rate limiting is per-instance in-memory; move to Redis before scaling
  horizontally.
