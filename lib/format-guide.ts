import type { DocumentGuide } from '@/types'

/** Formats a document guide as a plain-text checklist suitable for download or sharing. */
export function formatGuideAsText(guide: DocumentGuide): string {
  const lines: string[] = []

  lines.push(guide.service)
  lines.push('='.repeat(guide.service.length))
  lines.push('')
  lines.push(guide.overview)
  lines.push('')
  lines.push(`Typical fees: ${guide.fees}`)
  lines.push(`Typical timeline: ${guide.timeline}`)
  if (guide.officialLink) lines.push(`Official portal: ${guide.officialLink}`)
  lines.push('')

  if (guide.documents.length > 0) {
    lines.push("Documents you'll need:")
    for (const doc of guide.documents) lines.push(`- ${doc}`)
    lines.push('')
  }

  if (guide.steps.length > 0) {
    lines.push('Step-by-step process:')
    guide.steps.forEach((step, i) => lines.push(`${i + 1}. ${step}`))
    lines.push('')
  }

  if (guide.tips.length > 0) {
    lines.push('Tips to avoid common mistakes:')
    for (const tip of guide.tips) lines.push(`- ${tip}`)
    lines.push('')
  }

  lines.push('---')
  lines.push('AI-generated via Smart Bharat AI. Verify on the official government portal.')

  return lines.join('\n')
}
