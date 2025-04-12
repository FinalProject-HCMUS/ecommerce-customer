import type React from 'react';
import TypingIndicator from './TypingIndicator';
import type { Message } from '../../../interfaces/message';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div className={`flex items-start gap-3 ${message.sender === 'other' ? 'justify-end' : ''}`}>
      {message.sender === 'user' && (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
          <img src="/placeholder.svg?height=40&width=40" alt="User avatar" className="w-full h-full object-cover" />
        </div>
      )}

      <div className={`group max-w-[80%] sm:max-w-[70%] ${message.sender === 'other' ? 'order-1' : 'order-2'}`}>
        {message.isTyping ? (
          <div className="bg-gray-200 rounded-3xl py-3 px-4 inline-block">
            <TypingIndicator />
          </div>
        ) : (
          <div
            className={`rounded-3xl py-3 px-4 animate-fade-in ${
              message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-800 text-white'
            }`}
          >
            {message.text}
          </div>
        )}

        {message.timestamp && <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>}
      </div>

      {message.sender === 'other' && (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-300 order-2">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="Other user avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
