'use client'

import { useEffect, useState } from 'react'

export default function Sidebar() {
  const [isDark, setIsDark] = useState(false)

  // Load theme preference on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      setIsDark(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle and persist theme
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
  }

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white h-screen p-4 space-y-4">
      <h2 className="text-2xl font-bold">AI Chat</h2>

      <button
        onClick={toggleTheme}
        className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>

      <nav className="space-y-2">
        <button className="block w-full text-left">Home</button>
        <button className="block w-full text-left">Chat</button>
      </nav>
    </div>
  )
}
