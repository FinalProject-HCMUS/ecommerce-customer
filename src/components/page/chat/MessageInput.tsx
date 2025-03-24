import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (text: string) => void
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    }
  }

  return (
    <div className="bg-white border-t p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type something"
              className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <button type="submit" className="p-2 rounded-full bg-gray-800 text-white" disabled={!inputValue.trim()}>
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
            <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" className="w-full h-full object-cover" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default MessageInput

