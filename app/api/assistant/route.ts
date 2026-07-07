import type { Content } from '@google/generative-ai'
import { type NextRequest } from 'next/server'
import { Errors, toErrorResponse } from '@/lib/errors'
import { getClientId, rateLimit } from '@/lib/rate-limit'
import { assistantRequestSchema } from '@/lib/validation'
import { streamChat } from '@/services/gemini/generate'
import { assistantSystemInstruction } from '@/services/gemini/prompts'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const clientId = getClientId(req.headers)
    if (!rateLimit(`assistant:${clientId}`, { limit: 20, windowMs: 60_000 }).success) {
      throw Errors.rateLimit()
    }

    const json = await req.json().catch(() => null)
    const parsed = assistantRequestSchema.safeParse(json)
    if (!parsed.success) {
      throw Errors.validation('Please provide a valid message.')
    }

    const { messages, language } = parsed.data

    // Last message is the new user turn; everything before is history.
    const latest = messages[messages.length - 1]
    if (latest.role !== 'user') {
      throw Errors.validation('The last message must come from the user.')
    }

    const history: Content[] = messages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const generator = await streamChat({
      history,
      message: latest.content,
      systemInstruction: assistantSystemInstruction(language),
    })

    const encoder = new TextEncoder()
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of generator) {
            controller.enqueue(encoder.encode(chunk))
          }
        } catch (err) {
          console.error('[v0] assistant stream error:', err)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    return toErrorResponse(err)
  }
}
