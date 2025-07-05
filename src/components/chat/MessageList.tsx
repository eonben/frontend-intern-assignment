'use client'

import { useEffect, useRef } from 'react'
import { Message } from './ChatContainer'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`max-w-xs md:max-w-md p-3 rounded-lg shadow text-sm relative ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white ml-auto'
                : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white mr-auto'
            }`}
          >
            {msg.text}
            <span className="block text-[10px] text-right opacity-70 mt-1">
              {msg.timestamp}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      <div ref={endRef} />
    </div>
  )
}
