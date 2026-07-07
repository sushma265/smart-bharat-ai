'use client'

import { useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ISSUE_TYPES } from '@/lib/constants'
import type { ComplaintInput } from '@/hooks/use-complaints'

const INITIAL_STATE: ComplaintInput = { issueType: '', location: '', description: '' }

export function ReportForm({ onSubmit }: { onSubmit: (input: ComplaintInput) => void }) {
  const [form, setForm] = useState<ComplaintInput>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof ComplaintInput, string>>>({})
  const locationId = useId()
  const descriptionId = useId()

  function updateField<K extends keyof ComplaintInput>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors: Partial<Record<keyof ComplaintInput, string>> = {}
    if (!form.issueType) nextErrors.issueType = 'Please select an issue type.'
    if (!form.location.trim()) nextErrors.location = 'Please add a location.'
    if (form.description.trim().length < 10) {
      nextErrors.description = 'Please describe the issue in a bit more detail.'
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit(form)
    setForm(INITIAL_STATE)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-4 md:p-6">
      <div className="space-y-1.5">
        <Label>Issue type</Label>
        <Select
          value={form.issueType}
          onValueChange={(value) => updateField('issueType', value ?? '')}
        >
          <SelectTrigger className="w-full" aria-invalid={!!errors.issueType}>
            <SelectValue placeholder="Select an issue type" />
          </SelectTrigger>
          <SelectContent>
            {ISSUE_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.issueType && <p className="text-xs text-destructive">{errors.issueType}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={locationId}>Location</Label>
        <Input
          id={locationId}
          placeholder="e.g. MG Road, Vijayawada"
          value={form.location}
          onChange={(e) => updateField('location', e.target.value)}
          aria-invalid={!!errors.location}
        />
        {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={descriptionId}>Describe the issue</Label>
        <Textarea
          id={descriptionId}
          placeholder="Tell us what's going on, since when, and anything else that helps."
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          aria-invalid={!!errors.description}
          rows={4}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>

      <Button type="submit" className="w-full sm:w-auto">
        Submit report
      </Button>
    </form>
  )
}
