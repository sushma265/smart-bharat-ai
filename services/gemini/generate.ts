import 'server-only'

import {
  type Content,
  type ResponseSchema,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai'
import { Errors } from '@/lib/errors'
import { getGeminiClient, getModelId } from './client'

const SAFETY_SETTINGS = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
]

/**
 * Generates a JSON object matching the provided response schema.
 * Throws AppError on failure so callers can surface a clean message.
 */
export async function generateStructured<T>(options: {
  prompt: string
  schema: ResponseSchema
  systemInstruction?: string
}): Promise<T> {
  const client = getGeminiClient()
  const model = client.getGenerativeModel({
    model: getModelId(),
    systemInstruction: options.systemInstruction,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: options.schema,
      temperature: 0.4,
    },
  })

  try {
    const result = await model.generateContent(options.prompt)
    const text = result.response.text()
    return JSON.parse(text) as T
  } catch (err) {
    console.error('[v0] generateStructured failed:', err)
    throw Errors.ai()
  }
}

/**
 * Streams a plain-text assistant response as an async iterable of chunks.
 */
export async function streamChat(options: {
  history: Content[]
  message: string
  systemInstruction: string
}): Promise<AsyncGenerator<string>> {
  const client = getGeminiClient()
  const model = client.getGenerativeModel({
    model: getModelId(),
    systemInstruction: options.systemInstruction,
    safetySettings: SAFETY_SETTINGS,
    generationConfig: { temperature: 0.6 },
  })

  try {
    const chat = model.startChat({ history: options.history })
    const result = await chat.sendMessageStream(options.message)

    async function* iterate() {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) yield text
      }
    }
    return iterate()
  } catch (err) {
    console.error('[v0] streamChat failed:', err)
    throw Errors.ai()
  }
}
