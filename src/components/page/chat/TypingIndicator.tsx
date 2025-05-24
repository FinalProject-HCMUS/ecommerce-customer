import type React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex space-x-1">
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: '0ms' }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: '150ms' }}
      ></div>
      <div
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: '300ms' }}
      ></div>
    </div>
  );
};

export default TypingIndicator;
