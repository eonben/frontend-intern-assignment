type Message = {
  id: string
  text: string
  sender: 'user' | 'ai'
}

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-bl-none'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}
