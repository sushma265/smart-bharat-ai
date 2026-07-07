import type { Metadata } from 'next'
import { ReportAssistant } from '@/components/report/report-assistant'

export const metadata: Metadata = {
  title: 'Report an Issue — Smart Bharat AI',
  description: 'Report a public issue in your area and track its status.',
}

export default function ReportPage() {
  return <ReportAssistant />
}
