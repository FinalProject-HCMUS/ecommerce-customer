import type React from 'react';
import { MessageResponse } from '../../../interfaces';
import { formatTime } from '../../../utils/formatDate';

interface MessageBubbleProps {
  message: MessageResponse;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
    >
      {message.role === 'admin' && (
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
          <img
            src="/placeholder.svg?height=40&width=40"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        className={`group max-w-[80%] sm:max-w-[70%] ${message.role === 'admin' ? 'order-1' : 'order-2'}`}
      >
        <div
          className={`rounded-3xl py-3 px-4 animate-fade-in ${
            message.role === 'user'
              ? 'bg-black text-white'
              : 'bg-gray-800 text-white'
          }`}
        >
          {message.content}
        </div>

        {message.createdAt && (
          <div className="text-xs text-gray-500 mt-1">
            {formatTime(message.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
