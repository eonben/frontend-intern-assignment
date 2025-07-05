'use client'

import { useEffect, useState } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import TypingIndicator from './TypingIndicator'

export type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: string
}

const STORAGE_KEY = 'chat-messages'

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setMessages(JSON.parse(stored))
      } catch {
        console.error('Failed to parse stored messages.')
      }
    } else {
      setMessages([
        {
          id: '1',
          text: 'Hi there! How can I help you today?',
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])

  const handleSendMessage = (text: string) => {
    const now = new Date().toLocaleTimeString()
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: now,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    setTimeout(() => {
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        text: `You said: “${text}” 🤖`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, aiReply])
      setIsTyping(false)
    }, 1200)
  }

  const handleClear = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="flex flex-col h-full border rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-black dark:text-white">Chat</h2>
        <button
          onClick={handleClear}
          className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
        >
          Clear Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <MessageList messages={messages} />
      </div>

      {isTyping && <TypingIndicator />}

      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <MessageInput onSend={handleSendMessage} />
      </div>
    </div>
  )
}
