import type { Metadata } from 'next'
import { DocumentAssistant } from '@/components/documents/document-assistant'

export const metadata: Metadata = {
  title: 'Document Assistant — Smart Bharat AI',
  description:
    'Get a step-by-step checklist of documents, fees, and timelines for any Indian government service.',
}

export default function DocumentsPage() {
  return <DocumentAssistant />
}
