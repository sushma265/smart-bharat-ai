import { type NextRequest, NextResponse } from 'next/server'
import { Errors, toErrorResponse } from '@/lib/errors'
import { getClientId, rateLimit } from '@/lib/rate-limit'
import { documentRequestSchema } from '@/lib/validation'
import { generateStructured } from '@/services/gemini/generate'
import { documentPrompt, SYSTEM_PERSONA } from '@/services/gemini/prompts'
import { documentResponseSchema } from '@/services/gemini/schemas'
import type { DocumentGuide } from '@/types'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientId(req.headers)
    if (!rateLimit(`documents:${clientId}`, { limit: 10, windowMs: 60_000 }).success) {
      throw Errors.rateLimit()
    }

    const json = await req.json().catch(() => null)
    const parsed = documentRequestSchema.safeParse(json)
    if (!parsed.success) {
      throw Errors.validation('Please enter a service or document name.')
    }

    const data = await generateStructured<DocumentGuide>({
      prompt: documentPrompt(parsed.data),
      schema: documentResponseSchema,
      systemInstruction: SYSTEM_PERSONA,
    })

    return NextResponse.json(data, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    return toErrorResponse(err)
  }
}
