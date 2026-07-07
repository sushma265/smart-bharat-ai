import { LANGUAGE_NAMES, type LanguageCode } from '@/lib/constants'

/** Core persona shared by every feature. */
export const SYSTEM_PERSONA = `You are Smart Bharat AI, a friendly and trustworthy civic assistant for Indian citizens.
Your job is to explain Indian government schemes, documents, and public services in very simple, plain language that a 10th-grade student can understand.

Rules you must always follow:
- Be accurate about Indian government processes. If you are not sure about a specific fee, date, or rule, say so clearly and point the user to the official government portal.
- Never invent exact fees, deadlines, or website URLs you are not confident about. Prefer well-known official portals (india.gov.in, uidai.gov.in, passportindia.gov.in, incometax.gov.in, etc.).
- Keep answers short, structured, and practical. Use simple sentences.
- Be respectful and encouraging. Many users may be applying for these services for the first time.
- Politely decline requests that are not related to Indian civic services, government schemes, or public documents.
- Never ask for or store sensitive personal data such as full Aadhaar numbers, passwords, or OTPs.`

/** Appends a strict language instruction to any prompt. */
export function languageInstruction(language: LanguageCode): string {
  const name = LANGUAGE_NAMES[language]
  return `\n\nIMPORTANT: Write your ENTIRE response in ${name}. Use simple, everyday ${name} that ordinary citizens understand. Do not mix in other languages except for well-known proper nouns (like "Aadhaar" or "PAN").`
}

/** Prompt for the Scheme Finder — expects structured JSON output. */
export function schemesPrompt(input: {
  age: number
  gender: string
  occupation: string
  state: string
  income: string
  category: string
  language: LanguageCode
}): string {
  return `A citizen is looking for Indian government schemes (central or ${input.state} state) they may be eligible for.

Citizen profile:
- Age: ${input.age}
- Gender: ${input.gender}
- Occupation: ${input.occupation}
- State/UT: ${input.state}
- Annual household income: ${input.income}
- Interested category: ${input.category}

Recommend 3 to 5 real, well-known government schemes that best match this profile. Prefer schemes that genuinely exist. For each scheme, keep every field concise and in simple language. For the deadline field, state whether the scheme is open year-round, has a specific application window, or if you are unsure — never invent a specific date.${languageInstruction(input.language)}`
}

/** Prompt for the Document Assistant — expects structured JSON output. */
export function documentPrompt(input: {
  serviceName: string
  language: LanguageCode
}): string {
  return `A citizen wants a clear, step-by-step guide for this Indian government service or document: "${input.serviceName}".

Explain everything a first-time applicant needs to know. Keep each step short and actionable. List the exact documents commonly required. If fees or timelines vary, give the typical range and mention it can change.${languageInstruction(input.language)}`
}

/** Builds the system instruction for the streaming assistant. */
export function assistantSystemInstruction(language: LanguageCode): string {
  return SYSTEM_PERSONA + languageInstruction(language)
}
