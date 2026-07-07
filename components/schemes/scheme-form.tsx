'use client'

import { Sparkles } from 'lucide-react'
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
import {
  GENDERS,
  INCOME_BANDS,
  INDIAN_STATES,
  OCCUPATIONS,
  SCHEME_CATEGORIES,
} from '@/lib/constants'
import { schemesRequestSchema, type SchemesRequest } from '@/lib/validation'

type FormState = {
  age: string
  gender: string
  occupation: string
  state: string
  income: string
  category: string
}

const INITIAL_STATE: FormState = {
  age: '',
  gender: '',
  occupation: '',
  state: '',
  income: '',
  category: 'Any',
}

export function SchemeForm({
  onSubmit,
  disabled,
  language,
}: {
  onSubmit: (input: SchemesRequest) => void
  disabled?: boolean
  language: SchemesRequest['language']
}) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const ageId = useId()

  function updateField<K extends keyof FormState>(key: K, value: string | null) {
    setForm((prev) => ({ ...prev, [key]: value ?? '' }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (disabled) return

    const parsed = schemesRequestSchema.safeParse({ ...form, language })
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormState | undefined
        if (field && !fieldErrors[field]) {
          fieldErrors[field] =
            field === 'age'
              ? 'Enter a valid age between 1 and 120.'
              : 'Please fill in this field.'
        }
      }
      setErrors(fieldErrors)
      return
    }

    onSubmit(parsed.data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor={ageId}>Age</Label>
          <Input
            id={ageId}
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            placeholder="e.g. 35"
            value={form.age}
            onChange={(e) => updateField('age', e.target.value)}
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? `${ageId}-error` : undefined}
          />
          {errors.age && (
            <p id={`${ageId}-error`} className="text-xs text-destructive">
              {errors.age}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>Gender</Label>
          <Select value={form.gender} onValueChange={(v) => updateField('gender', v)}>
            <SelectTrigger className="w-full" aria-invalid={Boolean(errors.gender)}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Occupation</Label>
          <Select value={form.occupation} onValueChange={(v) => updateField('occupation', v)}>
            <SelectTrigger className="w-full" aria-invalid={Boolean(errors.occupation)}>
              <SelectValue placeholder="Select occupation" />
            </SelectTrigger>
            <SelectContent>
              {OCCUPATIONS.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.occupation && <p className="text-xs text-destructive">{errors.occupation}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>State / UT</Label>
          <Select value={form.state} onValueChange={(v) => updateField('state', v)}>
            <SelectTrigger className="w-full" aria-invalid={Boolean(errors.state)}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && <p className="text-xs text-destructive">{errors.state}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Annual household income</Label>
          <Select value={form.income} onValueChange={(v) => updateField('income', v)}>
            <SelectTrigger className="w-full" aria-invalid={Boolean(errors.income)}>
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              {INCOME_BANDS.map((band) => (
                <SelectItem key={band} value={band}>
                  {band}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.income && <p className="text-xs text-destructive">{errors.income}</p>}
        </div>

        <div className="space-y-1.5">
          <Label>Category of interest</Label>
          <Select value={form.category} onValueChange={(v) => updateField('category', v)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SCHEME_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={disabled} className="w-full sm:w-auto">
        <Sparkles className="size-4" data-icon="inline-start" />
        {disabled ? 'Finding schemes…' : 'Find my schemes'}
      </Button>
    </form>
  )
}
