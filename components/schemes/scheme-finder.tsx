'use client'

import { RotateCcw, Search } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { ErrorState } from '@/components/shared/error-state'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { useSchemeFinder } from '@/hooks/use-scheme-finder'
import { SchemeCard } from './scheme-card'
import { SchemeCardSkeleton } from './scheme-card-skeleton'
import { SchemeForm } from './scheme-form'

export function SchemeFinder() {
  const { language } = useLanguage()
  const { status, schemes, error, findSchemes, retry, reset } = useSchemeFinder()

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Search}
        title="Scheme Finder"
        description="Tell us a little about yourself and we'll match you with government schemes you may be eligible for."
      />

      {status !== 'success' && (
        <SchemeForm onSubmit={findSchemes} disabled={status === 'loading'} language={language} />
      )}

      {status === 'loading' && (
        <div className="grid gap-4 sm:grid-cols-2" aria-live="polite" aria-busy="true">
          <span className="sr-only">Finding schemes that match your profile…</span>
          {Array.from({ length: 4 }).map((_, i) => (
            <SchemeCardSkeleton key={i} />
          ))}
        </div>
      )}

      {status === 'error' && <ErrorState message={error ?? 'Something went wrong.'} onRetry={retry} />}

      {status === 'success' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              {schemes.length > 0
                ? `Found ${schemes.length} scheme${schemes.length === 1 ? '' : 's'} that may match your profile.`
                : 'No matching schemes were found for this profile.'}
            </p>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-3.5" data-icon="inline-start" />
              Search again
            </Button>
          </div>

          {schemes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {schemes.map((scheme, i) => (
                <SchemeCard key={`${scheme.name}-${i}`} scheme={scheme} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                Try adjusting your profile details, such as occupation or category, and search again.
              </p>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground">
            AI-generated guidance based on general scheme rules as of{' '}
            {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}.
            Always verify eligibility, amounts, and current status on the official government portal.
          </p>
        </div>
      )}
    </div>
  )
}
