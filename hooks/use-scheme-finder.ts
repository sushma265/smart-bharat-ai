'use client'

import { useCallback, useState } from 'react'
import type { SchemesRequest } from '@/lib/validation'
import type { Scheme } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface UseSchemeFinderResult {
  status: Status
  schemes: Scheme[]
  error: string | null
  findSchemes: (input: SchemesRequest) => Promise<void>
  retry: () => void
  reset: () => void
}

export function useSchemeFinder(): UseSchemeFinderResult {
  const [status, setStatus] = useState<Status>('idle')
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [error, setError] = useState<string | null>(null)
  const [lastInput, setLastInput] = useState<SchemesRequest | null>(null)

  const findSchemes = useCallback(async (input: SchemesRequest) => {
    setStatus('loading')
    setError(null)
    setLastInput(input)

    try {
      const res = await fetch('/api/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.error?.message ?? 'Something went wrong. Please try again.')
      }

      setSchemes(Array.isArray(data?.schemes) ? data.schemes : [])
      setStatus('success')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }, [])

  const retry = useCallback(() => {
    if (lastInput) void findSchemes(lastInput)
  }, [lastInput, findSchemes])

  const reset = useCallback(() => {
    setStatus('idle')
    setSchemes([])
    setError(null)
    setLastInput(null)
  }, [])

  return { status, schemes, error, findSchemes, retry, reset }
}
