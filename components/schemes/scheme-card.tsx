import { CalendarClock, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Scheme } from '@/types'

export function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-snug text-balance">
            {scheme.name}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {scheme.ministry}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-card-foreground">{scheme.benefit}</p>

        {scheme.eligibility.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Who is eligible
            </p>
            <ul className="space-y-1">
              {scheme.eligibility.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            How to apply
          </p>
          <p className="text-sm leading-relaxed">{scheme.howToApply}</p>
        </div>

        {scheme.deadline && (
          <div className="flex items-start gap-1.5 text-sm leading-relaxed text-card-foreground">
            <CalendarClock className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            {scheme.deadline}
          </div>
        )}

        {scheme.officialLink && (
          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Official portal
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        )}
      </CardContent>
    </Card>
  )
}
