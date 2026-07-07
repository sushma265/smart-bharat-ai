import type { LanguageCode } from '@/lib/constants'

export type { LanguageCode }

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface Scheme {
  name: string
  ministry: string
  benefit: string
  eligibility: string[]
  howToApply: string
  officialLink: string
  deadline?: string
}

export interface DocumentGuide {
  service: string
  overview: string
  documents: string[]
  steps: string[]
  fees: string
  timeline: string
  officialLink: string
  tips: string[]
}

export interface ApiError {
  error: { code: string; message: string }
}

export type ComplaintStatus = 'Submitted' | 'In review' | 'Resolved'

export interface Complaint {
  id: string
  issueType: string
  location: string
  description: string
  status: ComplaintStatus
  createdAt: string
}
