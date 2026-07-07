'use client'

import { useCallback, useRef, useState } from 'react'
import { useLanguage } from '@/components/providers/language-provider'
import type { ChatMessage } from '@/types'

interface UseChatResult {
  messages: ChatMessage[]
  isStreaming: boolean
  error: string | null
  sendMessage: (content: string) => Promise<void>
  reset: () => void
}

export function useChat(): UseChatResult {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim()
      if (!trimmed || isStreaming) return

      setError(null)
      const nextMessages: ChatMessage[] = [
        ...messages,
        { role: 'user', content: trimmed },
      ]
      setMessages([...nextMessages, { role: 'assistant', content: '' }])
      setIsStreaming(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: nextMessages, language }),
          signal: controller.signal,
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(
            data?.error?.message ?? 'Something went wrong. Please try again.',
          )
        }
        if (!res.body) throw new Error('No response received.')

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let acc = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          acc += decoder.decode(value, { stream: true })
          setMessages((prev) => {
            const copy = [...prev]
            copy[copy.length - 1] = { role: 'assistant', content: acc }
            return copy
          })
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError((err as Error).message)
        // Remove the empty assistant placeholder on error.
        setMessages((prev) => {
          const copy = [...prev]
          if (copy[copy.length - 1]?.content === '') copy.pop()
          return copy
        })
      } finally {
        setIsStreaming(false)
        abortRef.current = null
      }
    },
    [messages, isStreaming, language],
  )

  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages([])
    setError(null)
    setIsStreaming(false)
  }, [])

  return { messages, isStreaming, error, sendMessage, reset }
}
