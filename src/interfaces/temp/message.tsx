export interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: string
  isTyping?: boolean
}
