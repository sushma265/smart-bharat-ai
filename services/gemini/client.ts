import 'server-only'

import { GoogleGenerativeAI } from '@google/generative-ai'
import { serverEnv } from '@/lib/env'

let cached: GoogleGenerativeAI | null = null

/** Returns a memoized, server-only Gemini client. */
export function getGeminiClient(): GoogleGenerativeAI {
  if (!cached) {
    cached = new GoogleGenerativeAI(serverEnv.geminiApiKey)
  }
  return cached
}

export function getModelId(): string {
  return serverEnv.geminiModel
}
