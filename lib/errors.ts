import { NextResponse } from 'next/server'

/** Application error with a stable machine-readable code and HTTP status. */
export class AppError extends Error {
  readonly code: string
  readonly status: number

  constructor(code: string, message: string, status = 400) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status
  }
}

export const Errors = {
  validation: (message: string) => new AppError('validation_error', message, 422),
  rateLimit: () =>
    new AppError('rate_limited', 'Too many requests. Please wait a moment and try again.', 429),
  ai: (message = 'The AI service is temporarily unavailable. Please try again.') =>
    new AppError('ai_error', message, 502),
  server: (message = 'Something went wrong. Please try again.') =>
    new AppError('server_error', message, 500),
}

/** Normalizes any thrown value into a JSON error response. */
export function toErrorResponse(err: unknown): NextResponse {
  if (err instanceof AppError) {
    return NextResponse.json(
      { error: { code: err.code, message: err.message } },
      { status: err.status },
    )
  }
  console.error('[v0] Unhandled API error:', err)
  return NextResponse.json(
    { error: { code: 'server_error', message: 'Something went wrong. Please try again.' } },
    { status: 500 },
  )
}
