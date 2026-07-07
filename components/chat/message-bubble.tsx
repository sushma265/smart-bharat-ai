import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'
import { LoadingDots } from '@/components/shared/loading-dots'

export function MessageBubble({
  message,
  streaming,
}: {
  message: ChatMessage
  streaming?: boolean
}) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-lg',
          isUser
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-primary text-primary-foreground',
        )}
        aria-hidden
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </span>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'rounded-tr-sm bg-primary text-primary-foreground'
            : 'rounded-tl-sm bg-card text-card-foreground ring-1 ring-foreground/10',
        )}
      >
        {message.content ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : streaming ? (
          <LoadingDots />
        ) : null}
      </div>
    </div>
  )
}
