import type React from 'react'
import { useState, useRef, useEffect } from 'react'
import Breadcrumb from '../../components/shared/Breadcrumb'
import ChatContainer from '../../components/page/chat/ChatContainer'
import MessageInput from '../../components/page/chat/MessageInput'
import { Message } from '../../interfaces/temp/message'
import { message } from '../../data/message'

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(message)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'other',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      }
      setMessages([...messages, newMessage])
    }
  }

  return (
    <div className="flex mt-10 px-8 py-8 flex-col h-screen bg-gray-50 bg-white text-gray-800">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Chat', path: '/chat' },
        ]}
      />
      <ChatContainer messages={messages} messagesEndRef={messagesEndRef} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default App
