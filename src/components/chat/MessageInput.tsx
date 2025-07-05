'use client'

import { useState, useRef } from 'react'
import { FaPaperPlane, FaSmile } from 'react-icons/fa'
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

type Props = {
  onSend: (text: string) => void
}

export default function MessageInput({ onSend }: Props) {
  const [input, setInput] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input)
    setInput('')
    setShowEmojiPicker(false)
  }

  const handleEmojiSelect = (emoji: any) => {
    setInput((prev) => prev + emoji.native)
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-0 z-10">
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme="dark"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-gray-500 hover:text-yellow-400 transition"
        >
          <FaSmile size={20} />
        </button>

        <textarea
          ref={inputRef}
          className="flex-1 resize-none rounded px-4 py-2 bg-gray-800 text-white focus:outline-none"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />

        <button
          onClick={handleSend}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          <FaPaperPlane size={20} />
        </button>
      </div>
    </div>
  )
}
