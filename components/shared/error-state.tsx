import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
    >
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden />
      <div className="flex-1 space-y-2">
        <p className="text-sm text-foreground">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try again
          </Button>
        )}
      </div>
    </div>
  )
}
