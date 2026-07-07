import type { Metadata } from 'next'
import { ChatWindow } from '@/components/chat/chat-window'

export const metadata: Metadata = {
  title: 'Civic Assistant — Smart Bharat AI',
  description:
    'Ask anything about Indian government services and get simple, plain-language answers.',
}

export default function AssistantPage() {
  return <ChatWindow />
}
