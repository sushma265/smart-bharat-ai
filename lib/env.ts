import 'server-only'

/**
 * Server-only environment access. Never import this file in client components.
 * Keeps the Gemini key out of the browser bundle.
 */
function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${name}. Add it in Project Settings → Environment Variables.`,
    )
  }
  return value
}

export const serverEnv = {
  get geminiApiKey(): string {
    return requireEnv('GEMINI_API_KEY')
  },
  /** Model id can be overridden via env; defaults to a fast, current Gemini model. */
  get geminiModel(): string {
    return process.env.GEMINI_MODEL?.trim() || 'gemini-1.5-flash'
  },
}
