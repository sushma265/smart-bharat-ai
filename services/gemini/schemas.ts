import { type ResponseSchema, SchemaType } from '@google/generative-ai'

/** Gemini response schema for the Scheme Finder. */
export const schemesResponseSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    schemes: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING, description: 'Official scheme name' },
          ministry: { type: SchemaType.STRING, description: 'Ministry or department that runs it' },
          benefit: { type: SchemaType.STRING, description: 'What the citizen gets, in one simple sentence' },
          eligibility: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: 'Short bullet points on who is eligible',
          },
          howToApply: { type: SchemaType.STRING, description: 'How to apply, in simple steps' },
          officialLink: { type: SchemaType.STRING, description: 'Official government portal URL' },
          deadline: {
            type: SchemaType.STRING,
            description:
              'Application deadline or window if the scheme has one (e.g. "Rolling, no fixed deadline" or "Applications open March–June"). Never invent a specific date you are not confident about.',
          },
        },
        required: ['name', 'ministry', 'benefit', 'eligibility', 'howToApply', 'officialLink', 'deadline'],
      },
    },
  },
  required: ['schemes'],
}

/** Gemini response schema for the Document Assistant. */
export const documentResponseSchema: ResponseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    service: { type: SchemaType.STRING },
    overview: { type: SchemaType.STRING, description: 'One or two simple sentences explaining the service' },
    documents: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'List of documents commonly required',
    },
    steps: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Ordered, actionable application steps',
    },
    fees: { type: SchemaType.STRING, description: 'Typical fees or a note that it varies' },
    timeline: { type: SchemaType.STRING, description: 'Typical processing time' },
    officialLink: { type: SchemaType.STRING, description: 'Official government portal URL' },
    tips: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: 'Helpful tips to avoid common mistakes',
    },
  },
  required: ['service', 'overview', 'documents', 'steps', 'fees', 'timeline', 'officialLink', 'tips'],
}
