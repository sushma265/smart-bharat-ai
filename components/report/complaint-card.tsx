import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Complaint } from '@/types'

const STATUS_VARIANT: Record<Complaint['status'], 'secondary' | 'outline' | 'default'> = {
  Submitted: 'secondary',
  'In review': 'outline',
  Resolved: 'default',
}

export function ComplaintCard({ complaint }: { complaint: Complaint }) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {complaint.id}
            </p>
            <h3 className="text-base font-medium">{complaint.issueType}</h3>
          </div>
          <Badge variant={STATUS_VARIANT[complaint.status]}>{complaint.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{complaint.location}</p>
        <p className="text-sm leading-relaxed">{complaint.description}</p>
        <p className="text-xs text-muted-foreground">
          Reported {new Date(complaint.createdAt).toLocaleString('en-IN')}
        </p>
      </CardContent>
    </Card>
  )
}
