import Sidebar from '@/components/layout/Sidebar'
import ChatContainer from '@/components/chat/ChatContainer'

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white dark:bg-gray-950 text-black dark:text-white">
        <ChatContainer />
      </main>
    </div>
  )
}
