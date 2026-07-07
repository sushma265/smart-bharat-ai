# API Reference

All routes are POST-only, run on the Node.js runtime, validate their request
body with [Zod](https://zod.dev), and are rate-limited per client IP. Errors
always return the same JSON shape:

```json
{ "error": { "code": "validation_error", "message": "Please provide a valid message." } }
```

| `code` | HTTP status | Meaning |
|---|---|---|
| `validation_error` | 422 | Request body failed schema validation |
| `rate_limited` | 429 | Too many requests from this client in the current window |
| `ai_error` | 502 | Gemini call failed or returned something unusable |
| `server_error` | 500 | Unhandled error |

---

## `POST /api/assistant`

Streaming civic Q&A chat. Rate limit: **20 requests / 60s** per client.

### Request body

```ts
{
  language: 'en' | 'hi' | 'te'
  messages: Array<{ role: 'user' | 'assistant'; content: string }> // 1–20 items, each content 1–2000 chars
}
```

The last message in `messages` must have `role: 'user'` — everything before
it is treated as conversation history.

### Response

`200 OK` with `Content-Type: text/plain; charset=utf-8` — a raw stream of
UTF-8 text chunks (not SSE, not newline-delimited JSON). Read it with a
`ReadableStreamDefaultReader` and append chunks as they arrive, as
`hooks/use-chat.ts` does.

### Example

```bash
curl -N -X POST http://localhost:3000/api/assistant \
  -H "Content-Type: application/json" \
  -d '{
    "language": "en",
    "messages": [{ "role": "user", "content": "How do I apply for a PAN card?" }]
  }'
```

---

## `POST /api/schemes`

Structured government scheme recommendations. Rate limit: **10 requests / 60s**.

### Request body

```ts
{
  language: 'en' | 'hi' | 'te'
  age: number          // 1–120
  gender: string        // 1–30 chars
  occupation: string     // 1–60 chars
  state: string          // 1–60 chars
  income: string          // 1–40 chars, e.g. "₹1,00,000 – ₹2,50,000"
  category: string         // 1–60 chars, e.g. "Education" or "Any"
}
```

### Response

`200 OK`:

```ts
{
  schemes: Array<{
    name: string
    ministry: string
    benefit: string
    eligibility: string[]
    howToApply: string
    officialLink: string
  }>
}
```

---

## `POST /api/documents`

Structured step-by-step guide for a government service or document.
Rate limit: **10 requests / 60s**.

### Request body

```ts
{
  language: 'en' | 'hi' | 'te'
  serviceName: string // 3–120 chars, e.g. "Apply for a new Passport"
}
```

### Response

`200 OK`:

```ts
{
  service: string
  overview: string
  documents: string[]
  steps: string[]
  fees: string
  timeline: string
  officialLink: string
  tips: string[]
}
```

---

## Adding a new AI-backed route

1. Add a Zod schema to `lib/validation.ts`.
2. Add a Gemini `ResponseSchema` to `services/gemini/schemas.ts` (skip this for
   free-text/streaming routes).
3. Add a prompt builder to `services/gemini/prompts.ts`, appending
   `languageInstruction(language)`.
4. Add the route handler under `app/api/<name>/route.ts`, following the same
   validate → rate-limit → call Gemini → respond pattern used by every
   existing route.
5. Add a client-side hook under `hooks/` and a page under `app/dashboard/<name>/`.
