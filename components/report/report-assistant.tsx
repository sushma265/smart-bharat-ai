'use client'

import { Megaphone } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { useComplaints } from '@/hooks/use-complaints'
import { ComplaintCard } from './complaint-card'
import { ReportForm } from './report-form'

export function ReportAssistant() {
  const { complaints, submitComplaint } = useComplaints()

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Megaphone}
        title="Report an Issue"
        description="Report a public issue in your area and track its status here."
      />

      <ReportForm onSubmit={submitComplaint} />

      <div className="space-y-3">
        <p className="text-sm font-medium">
          {complaints.length > 0
            ? `Your reports (${complaints.length})`
            : 'No reports yet — submit one above to see it tracked here.'}
        </p>
        {complaints.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {complaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        This is an early version — reports are tracked for this session and are not yet sent to a
        government department. We don&apos;t store your personal details.
      </p>
    </div>
  )
}
