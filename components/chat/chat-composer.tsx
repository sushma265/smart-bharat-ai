'use client'

import { Send } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export function ChatComposer({
  onSend,
  disabled,
}: {
  onSend: (value: string) => void
  disabled?: boolean
}) {
  const [value, setValue] = useState('')
  const composingRef = useRef(false)

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className="flex items-end gap-2 rounded-2xl border border-border bg-card p-2 ring-1 ring-transparent focus-within:ring-ring/40"
    >
      <label htmlFor="chat-input" className="sr-only">
        Ask a question
      </label>
      <Textarea
        id="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onCompositionStart={() => (composingRef.current = true)}
        onCompositionEnd={() => (composingRef.current = false)}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' &&
            !e.shiftKey &&
            !composingRef.current &&
            e.nativeEvent.keyCode !== 229
          ) {
            e.preventDefault()
            submit()
          }
        }}
        rows={1}
        placeholder="Ask about passports, Aadhaar, taxes, licences…"
        className="max-h-40 min-h-10 flex-1 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
      />
      <Button
        type="submit"
        size="icon"
        disabled={disabled || !value.trim()}
        aria-label="Send message"
      >
        <Send className="size-4" />
      </Button>
    </form>
  )
}
