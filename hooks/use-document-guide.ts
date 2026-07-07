'use client'

import { useCallback, useState } from 'react'
import type { DocumentRequest } from '@/lib/validation'
import type { DocumentGuide } from '@/types'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface UseDocumentGuideResult {
  status: Status
  guide: DocumentGuide | null
  error: string | null
  findGuide: (input: DocumentRequest) => Promise<void>
  retry: () => void
  reset: () => void
}

export function useDocumentGuide(): UseDocumentGuideResult {
  const [status, setStatus] = useState<Status>('idle')
  const [guide, setGuide] = useState<DocumentGuide | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastInput, setLastInput] = useState<DocumentRequest | null>(null)

  const findGuide = useCallback(async (input: DocumentRequest) => {
    setStatus('loading')
    setError(null)
    setLastInput(input)

    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(data?.error?.message ?? 'Something went wrong. Please try again.')
      }

      setGuide(data as DocumentGuide)
      setStatus('success')
    } catch (err) {
      setError((err as Error).message)
      setStatus('error')
    }
  }, [])

  const retry = useCallback(() => {
    if (lastInput) void findGuide(lastInput)
  }, [lastInput, findGuide])

  const reset = useCallback(() => {
    setStatus('idle')
    setGuide(null)
    setError(null)
    setLastInput(null)
  }, [])

  return { status, guide, error, findGuide, retry, reset }
}
