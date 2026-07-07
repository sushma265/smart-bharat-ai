import { describe, expect, it } from 'vitest'
import { formatGuideAsText } from '@/lib/format-guide'
import type { DocumentGuide } from '@/types'

const guide: DocumentGuide = {
  service: 'Apply for a new Passport',
  overview: 'A short overview of the process.',
  documents: ['Proof of address', 'Proof of date of birth'],
  steps: ['Fill the online form', 'Book an appointment', 'Visit the Passport Seva Kendra'],
  fees: '₹1,500 for normal processing',
  timeline: '30-45 days',
  officialLink: 'https://passportindia.gov.in',
  tips: ['Carry originals and photocopies'],
}

describe('formatGuideAsText', () => {
  it('includes the service name as a heading', () => {
    const text = formatGuideAsText(guide)
    expect(text).toContain('Apply for a new Passport')
  })

  it('numbers the steps in order', () => {
    const text = formatGuideAsText(guide)
    expect(text).toContain('1. Fill the online form')
    expect(text).toContain('2. Book an appointment')
    expect(text).toContain('3. Visit the Passport Seva Kendra')
  })

  it('includes fees, timeline, and the official link', () => {
    const text = formatGuideAsText(guide)
    expect(text).toContain('₹1,500 for normal processing')
    expect(text).toContain('30-45 days')
    expect(text).toContain('https://passportindia.gov.in')
  })

  it('omits sections that are empty instead of printing blank headers', () => {
    const text = formatGuideAsText({ ...guide, tips: [] })
    expect(text).not.toContain('Tips to avoid common mistakes')
  })
})
