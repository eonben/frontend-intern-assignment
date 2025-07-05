import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle' // <- this is a CLIENT component

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Chat App',
  description: 'Frontend Intern Assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white">
        <ThemeToggle /> {/* ✅ This is a client component */}
        {children}
      </body>
    </html>
  )
}
