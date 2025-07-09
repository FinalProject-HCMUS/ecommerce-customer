import { render, screen } from '@testing-library/react';
import MessageBubble from './MessageBubble';

// Mock formatTime
jest.mock('../../../utils/formatDate', () => ({
  formatTime: (date: string) => `formatted-${date}`,
}));

const baseMessage = {
  id: '1',
  content: 'Hello, world!',
  userId: 'user1',
  conversationId: 'conv1',
  messageType: 'text',
  createdAt: '2024-07-01T12:34:00Z',
  createdBy: 'user1',
  role: 'user' as const,
};

describe('MessageBubble', () => {
  it('renders user message with correct content and time', () => {
    render(<MessageBubble message={baseMessage} />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(
      screen.getByText('formatted-2024-07-01T12:34:00Z')
    ).toBeInTheDocument();
    // Should not render avatar for user
    expect(screen.queryByAltText('User avatar')).not.toBeInTheDocument();
  });

  it('renders admin message with avatar, content, and time', () => {
    render(<MessageBubble message={{ ...baseMessage, role: 'admin' }} />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(
      screen.getByText('formatted-2024-07-01T12:34:00Z')
    ).toBeInTheDocument();
    // Should render avatar for admin
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('does not render time if createdAt is missing', () => {
    const { queryByText } = render(
      <MessageBubble message={{ ...baseMessage, createdAt: '' }} />
    );
    expect(queryByText(/formatted-/)).not.toBeInTheDocument();
  });
});
