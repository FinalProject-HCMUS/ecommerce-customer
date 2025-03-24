"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Breadcrumb from "../../components/shared/Breadcrumb"
import ChatContainer from "../../components/page/chat/ChatContainer"
import MessageInput from "../../components/page/chat/MessageInput"

export interface Message {
  id: string
  text: string
  sender: "user" | "other"
  timestamp: string
  isTyping?: boolean
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Now if you are interested in being the best player, getting really good money and knowing some tricks and advices of what to do in a live tournament games, here is the best place to learn them.",
      sender: "user",
      timestamp: "07:44 am",
    },
    {
      id: "2",
      text: "Some message text",
      sender: "other",
      timestamp: "08:43 am",
    },
    {
      id: "3",
      text: "Become A Travel Pro In One Easy",
      sender: "user",
      timestamp: "08:43 am",
    },
    {
      id: "4",
      isTyping: true,
      text: "",
      sender: "user",
      timestamp: "",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: "other",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }),
      }
      setMessages([...messages, newMessage])
    }
  }

  return (
    <div className="flex mt-10 px-4 py-8 flex-col h-screen bg-gray-50">
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

