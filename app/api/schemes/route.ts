import { type NextRequest, NextResponse } from 'next/server'
import { Errors, toErrorResponse } from '@/lib/errors'
import { getClientId, rateLimit } from '@/lib/rate-limit'
import { schemesRequestSchema } from '@/lib/validation'
import { generateStructured } from '@/services/gemini/generate'
import { schemesPrompt, SYSTEM_PERSONA } from '@/services/gemini/prompts'
import { schemesResponseSchema } from '@/services/gemini/schemas'
import type { Scheme } from '@/types'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientId(req.headers)
    if (!rateLimit(`schemes:${clientId}`, { limit: 10, windowMs: 60_000 }).success) {
      throw Errors.rateLimit()
    }

    const json = await req.json().catch(() => null)
    const parsed = schemesRequestSchema.safeParse(json)
    if (!parsed.success) {
      throw Errors.validation('Please fill in all fields correctly.')
    }

    const data = await generateStructured<{ schemes: Scheme[] }>({
      prompt: schemesPrompt(parsed.data),
      schema: schemesResponseSchema,
      systemInstruction: SYSTEM_PERSONA,
    })

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    return toErrorResponse(err)
  }
}
