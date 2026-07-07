'use client'

import { RotateCcw } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { ErrorState } from '@/components/shared/error-state'
import { Button } from '@/components/ui/button'
import { useChat } from '@/hooks/use-chat'
import { ASSISTANT_SUGGESTIONS } from '@/lib/constants'
import { ChatComposer } from './chat-composer'
import { MessageBubble } from './message-bubble'

export function ChatWindow() {
  const { messages, isStreaming, error, sendMessage, reset } = useChat()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-[calc(100svh-11rem)] flex-col">
      <div className="flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
            <div className="max-w-md space-y-2">
              <h2 className="font-serif text-xl font-semibold">
                Ask me anything about government services
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I can explain how to apply for documents, check eligibility, and
                walk you through processes step by step.
              </p>
            </div>
            <div className="grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {ASSISTANT_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="rounded-xl border border-border bg-card px-3 py-2.5 text-left text-sm text-card-foreground transition-colors hover:bg-secondary/60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 pb-4" role="log" aria-live="polite" aria-relevant="additions text">
            {messages.map((m, i) => (
              <MessageBubble
                key={i}
                message={m}
                streaming={isStreaming && i === messages.length - 1}
              />
            ))}
            {error && (
              <ErrorState
                message={error}
                onRetry={() => {
                  const lastUser = [...messages]
                    .reverse()
                    .find((m) => m.role === 'user')
                  if (lastUser) sendMessage(lastUser.content)
                }}
              />
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="space-y-2 pt-2">
        {!isEmpty && (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={reset} disabled={isStreaming}>
              <RotateCcw className="size-3.5" data-icon="inline-start" />
              New chat
            </Button>
          </div>
        )}
        <ChatComposer onSend={sendMessage} disabled={isStreaming} />
        <p className="text-center text-xs text-muted-foreground">
          AI-generated. Verify important details on official government portals.
        </p>
      </div>
    </div>
  )
}
