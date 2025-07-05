import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatContainer from './ChatContainer';
import { MessageResponse } from '../../../interfaces';

// Mock the MessageBubble component
jest.mock('./MessageBubble', () => ({
  __esModule: true,
  default: ({ message }: { message: MessageResponse }) => (
    <div data-testid="message-bubble" data-message-id={message.id}>
      {message.content}
    </div>
  ),
}));

describe('ChatContainer', () => {
  // Sample messages for testing
  const mockMessages: MessageResponse[] = [
    {
      id: '1',
      content: 'Hello there!',
      userId: 'user-123',
      conversationId: 'conv1',
      messageType: 'text',
      createdAt: '2023-07-05T10:30:00Z',
      createdBy: 'user-123',
      role: 'user',
    },
    {
      id: '2',
      content: 'How can I help you today?',
      userId: 'admin-456',
      conversationId: 'conv1',
      messageType: 'text',
      createdAt: '2023-07-05T10:31:00Z',
      createdBy: 'admin-456',
      role: 'admin',
    },
    {
      id: '3',
      content: 'I have a question about my order.',
      userId: 'user-123',
      conversationId: 'conv1',
      messageType: 'text',
      createdAt: '2023-07-05T10:32:00Z',
      createdBy: 'user-123',
      role: 'user',
    },
  ];

  test('renders empty state message when no messages are present', () => {
    // Create a ref for the messages end div
    const messagesEndRef = React.createRef<HTMLDivElement>();

    render(<ChatContainer messages={[]} messagesEndRef={messagesEndRef} />);

    // Check if the empty state message is displayed
    expect(
      screen.getByText('No messages yet. Start the conversation!')
    ).toBeInTheDocument();

    // Check that no message bubbles are rendered
    expect(screen.queryByTestId('message-bubble')).not.toBeInTheDocument();
  });

  test('renders all messages when messages are provided', () => {
    // Create a ref for the messages end div
    const messagesEndRef = React.createRef<HTMLDivElement>();

    render(
      <ChatContainer messages={mockMessages} messagesEndRef={messagesEndRef} />
    );

    // Check that the empty state message is not displayed
    expect(
      screen.queryByText('No messages yet. Start the conversation!')
    ).not.toBeInTheDocument();

    // Check that all messages are rendered
    const messageBubbles = screen.getAllByTestId('message-bubble');
    expect(messageBubbles).toHaveLength(3);

    // Check that messages are rendered in the correct order
    expect(messageBubbles[0]).toHaveAttribute('data-message-id', '1');
    expect(messageBubbles[1]).toHaveAttribute('data-message-id', '2');
    expect(messageBubbles[2]).toHaveAttribute('data-message-id', '3');

    // Check that message content is displayed
    expect(messageBubbles[0]).toHaveTextContent('Hello there!');
    expect(messageBubbles[1]).toHaveTextContent('How can I help you today?');
    expect(messageBubbles[2]).toHaveTextContent(
      'I have a question about my order.'
    );
  });

  test('attaches messagesEndRef to the end div', () => {
    // Create a ref for the messages end div and a spy to check if it's attached
    const messagesEndRef = React.createRef<HTMLDivElement>();

    // Mock the ref's current property to check if it's set correctly
    const refSpy = jest
      .spyOn(React, 'createRef')
      .mockImplementation(() => messagesEndRef);

    render(
      <ChatContainer messages={mockMessages} messagesEndRef={messagesEndRef} />
    );

    // After rendering, the ref's current should point to a div element
    expect(messagesEndRef.current).not.toBeNull();

    // Clean up the spy
    refSpy.mockRestore();
  });

  test('renders with proper structure and styling', () => {
    // Create a ref for the messages end div
    const messagesEndRef = React.createRef<HTMLDivElement>();

    const { container } = render(
      <ChatContainer messages={mockMessages} messagesEndRef={messagesEndRef} />
    );

    // Check that the container has the expected classes
    const chatContainer = container.firstChild;
    expect(chatContainer).toHaveClass(
      'max-w-4xl',
      'mx-auto',
      'space-y-6',
      'p-4'
    );
  });
});
