import { ExternalLink, Lightbulb } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { DocumentGuide } from '@/types'

export function DocumentGuideView({ guide }: { guide: DocumentGuide }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <h3 className="font-serif text-lg font-semibold text-balance">{guide.service}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{guide.overview}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Typical fees
              </p>
              <p className="text-sm leading-relaxed">{guide.fees}</p>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Typical timeline
              </p>
              <p className="text-sm leading-relaxed">{guide.timeline}</p>
            </div>
          </div>

          {guide.officialLink && (
            <a
              href={guide.officialLink}
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

      {guide.documents.length > 0 && (
        <Card>
          <CardContent className="space-y-2">
            <h4 className="text-sm font-medium">Documents you&apos;ll need</h4>
            <ul className="space-y-1.5">
              {guide.documents.map((doc, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                  {doc}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {guide.steps.length > 0 && (
        <Card>
          <CardContent className="space-y-2">
            <h4 className="text-sm font-medium">Step-by-step process</h4>
            <ol className="space-y-2.5">
              {guide.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}

      {guide.tips.length > 0 && (
        <Card>
          <CardContent className="space-y-2">
            <h4 className="flex items-center gap-1.5 text-sm font-medium">
              <Lightbulb className="size-4 text-primary" aria-hidden />
              Tips to avoid common mistakes
            </h4>
            <ul className="space-y-1.5">
              {guide.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" aria-hidden />
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
