'use client'

import { Download, FileText, RotateCcw, Share2 } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'
import { ErrorState } from '@/components/shared/error-state'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { useDocumentGuide } from '@/hooks/use-document-guide'
import { formatGuideAsText } from '@/lib/format-guide'
import { DocumentForm } from './document-form'
import { DocumentGuideView } from './document-guide'
import { DocumentGuideSkeleton } from './document-guide-skeleton'

function downloadGuide(guide: Parameters<typeof formatGuideAsText>[0]) {
  const text = formatGuideAsText(guide)
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${guide.service.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-checklist.txt`
  a.click()
  URL.revokeObjectURL(url)
}

function shareGuideOnWhatsApp(guide: Parameters<typeof formatGuideAsText>[0]) {
  const text = formatGuideAsText(guide)
  const url = `https://wa.me/?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function DocumentAssistant() {
  const { language } = useLanguage()
  const { status, guide, error, findGuide, retry, reset } = useDocumentGuide()

  return (
    <div className="space-y-6">
      <PageHeader
        icon={FileText}
        title="Document Assistant"
        description="Get a clear, step-by-step checklist of documents, fees, and timelines for any government service."
      />

      {status !== 'success' && (
        <DocumentForm onSubmit={findGuide} disabled={status === 'loading'} language={language} />
      )}

      {status === 'loading' && (
        <div aria-live="polite" aria-busy="true">
          <span className="sr-only">Preparing your document guide…</span>
          <DocumentGuideSkeleton />
        </div>
      )}

      {status === 'error' && <ErrorState message={error ?? 'Something went wrong.'} onRetry={retry} />}

      {status === 'success' && guide && (
        <div className="space-y-4">
          <div className="flex flex-wrap justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => downloadGuide(guide)}>
              <Download className="size-3.5" data-icon="inline-start" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => shareGuideOnWhatsApp(guide)}>
              <Share2 className="size-3.5" data-icon="inline-start" />
              Share via WhatsApp
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="size-3.5" data-icon="inline-start" />
              Search again
            </Button>
          </div>

          <DocumentGuideView guide={guide} />

          <p className="text-center text-xs text-muted-foreground">
            AI-generated guidance as of{' '}
            {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}.
            Fees and timelines change often — always verify on the official government portal before paying.
          </p>
        </div>
      )}
    </div>
  )
}
