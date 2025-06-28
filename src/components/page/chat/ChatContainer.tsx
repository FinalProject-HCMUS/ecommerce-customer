import React, { forwardRef } from 'react';
import MessageBubble from './MessageBubble';
import { MessageResponse } from '../../../interfaces';

interface ChatContainerProps {
  messages: MessageResponse[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatContainer = forwardRef<HTMLDivElement, ChatContainerProps>(
  ({ messages, messagesEndRef }) => {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    );
  }
);

ChatContainer.displayName = 'ChatContainer';

export default ChatContainer;
