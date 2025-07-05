'use client'

import { useState, useEffect } from 'react'

export default function TypingIndicator() {
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    // Simulate "typing" state for demo purposes
    const timer = setTimeout(() => {
      setIsTyping(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isTyping) return null

  return (
    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
      AI is typing<span className="dots">...</span>
    </div>
  )
}
