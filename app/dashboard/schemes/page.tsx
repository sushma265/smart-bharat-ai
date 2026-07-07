import type { Metadata } from 'next'
import { SchemeFinder } from '@/components/schemes/scheme-finder'

export const metadata: Metadata = {
  title: 'Scheme Finder — Smart Bharat AI',
  description:
    'Tell us about yourself and discover Indian government schemes you may be eligible for.',
}

export default function SchemesPage() {
  return <SchemeFinder />
}
