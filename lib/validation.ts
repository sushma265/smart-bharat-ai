import { z } from 'zod'

const languageSchema = z.enum(['en', 'hi', 'te'])

export const assistantRequestSchema = z.object({
  language: languageSchema,
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
})

export const schemesRequestSchema = z.object({
  language: languageSchema,
  age: z.coerce.number().int().min(1).max(120),
  gender: z.string().min(1).max(30),
  occupation: z.string().min(1).max(60),
  state: z.string().min(1).max(60),
  income: z.string().min(1).max(40),
  category: z.string().min(1).max(60),
})

export const documentRequestSchema = z.object({
  language: languageSchema,
  serviceName: z.string().min(3).max(120),
})

export type AssistantRequest = z.infer<typeof assistantRequestSchema>
export type SchemesRequest = z.infer<typeof schemesRequestSchema>
export type DocumentRequest = z.infer<typeof documentRequestSchema>
