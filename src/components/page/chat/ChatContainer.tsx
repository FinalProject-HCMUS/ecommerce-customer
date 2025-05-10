import type React from 'react';
import MessageBubble from './MessageBubble';
import type { Message } from '../../../interfaces/temp/message';

interface ChatContainerProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  messagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 ">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatContainer;
