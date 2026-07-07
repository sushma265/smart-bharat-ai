'use client'

import { FileSearch } from 'lucide-react'
import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { POPULAR_SERVICES } from '@/lib/constants'
import { documentRequestSchema, type DocumentRequest } from '@/lib/validation'

export function DocumentForm({
  onSubmit,
  disabled,
  language,
}: {
  onSubmit: (input: DocumentRequest) => void
  disabled?: boolean
  language: DocumentRequest['language']
}) {
  const [serviceName, setServiceName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputId = useId()

  function submit(value: string) {
    if (disabled) return
    const parsed = documentRequestSchema.safeParse({ serviceName: value, language })
    if (!parsed.success) {
      setError('Enter at least 3 characters describing the service or document.')
      return
    }
    setError(null)
    onSubmit(parsed.data)
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(serviceName)
        }}
        className="space-y-1.5"
      >
        <Label htmlFor={inputId}>Which service or document do you need?</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={inputId}
            value={serviceName}
            onChange={(e) => {
              setServiceName(e.target.value)
              setError(null)
            }}
            placeholder="e.g. Apply for a new Passport"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className="flex-1"
          />
          <Button type="submit" disabled={disabled} className="sm:w-auto">
            <FileSearch className="size-4" data-icon="inline-start" />
            {disabled ? 'Preparing guide…' : 'Get guide'}
          </Button>
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </form>

      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Popular services
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SERVICES.map((service) => (
            <button
              key={service}
              type="button"
              disabled={disabled}
              onClick={() => {
                setServiceName(service)
                submit(service)
              }}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
            >
              {service}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
