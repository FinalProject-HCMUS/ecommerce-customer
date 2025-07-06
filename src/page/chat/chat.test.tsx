import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './chat';
import * as ConversationHook from '../../hooks/conversation';

// Mock t function
jest.mock('../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

jest.mock('../../helpers/env', () => ({
  VITE_SOCKET_CHAT_URL: 'ws://mock-socket-url',
}));

// Mock Breadcrumb
jest.mock('../../components/shared/Breadcrumb', () => (props: any) => (
  <nav data-testid="breadcrumb">{JSON.stringify(props.items)}</nav>
));

// Mock ChatContainer
jest.mock('../../components/page/chat/ChatContainer', () => (props: any) => (
  <div data-testid="chat-container">
    {props.messages.map((msg: any) => (
      <div key={msg.id} data-testid="chat-message">
        {msg.content}
      </div>
    ))}
  </div>
));

// Mock MessageInput
jest.mock('../../components/page/chat/MessageInput', () => (props: any) => (
  <input
    data-testid="message-input"
    onKeyDown={(e) => {
      if (e.key === 'Enter') props.onSendMessage((e.target as HTMLInputElement).value);
    }}
    onChange={() => {}}
  />
));

// Mock Loading
jest.mock('../../components/shared/Loading', () => () => (
  <div data-testid="loading" />
));

// Mock useSelector
jest.mock('react-redux', () => ({
  useSelector: (fn: any) => fn({ auth: { userInfo: { id: 'user1' } } }),
}));

// Mock useConversation
const fetchCustomerConversations = jest.fn();
jest.mock('../../hooks/conversation', () => ({
  useConversation: () => ({
    conversations: [{ id: 'conv1' }],
    loading: false,
    fetchCustomerConversations,
  }),
}));

// Mock useMessage
const fetchMessages = jest.fn();
jest.mock('../../hooks/message', () => ({
  useMessage: () => ({
    messages: [
      {
        id: 'msg1',
        content: 'Hello',
        userId: 'user1',
        conversationId: 'conv1',
        messageType: 'TEXT',
        createdAt: new Date().toISOString(),
        role: 'user',
        createdBy: 'user1',
      },
    ],
    loading: false,
    pagination: { page: 0, size: 20 },
    fetchMessages,
  }),
}));

// Mock showError
const showError = jest.fn();
jest.mock('../../utils/messageRender', () => ({
  showError: (...args: any[]) => showError(...args),
}));

// Mock SockJS and Stomp Client
jest.mock('sockjs-client', () => function SockJS() {});
jest.mock('@stomp/stompjs', () => ({
  Client: function () {
    return {
      activate: jest.fn(),
      subscribe: jest.fn(),
      publish: jest.fn(),
      connected: true,
      deactivate: jest.fn(),
    };
  },
}));

// Mock crypto.randomUUID
global.crypto = {
  ...global.crypto,
  randomUUID: () => '123e4567-e89b-12d3-a456-426614174000',
};

describe('Chat Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders breadcrumb and chat container', async () => {
    render(<App />);
    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('chat-container')).toBeInTheDocument();
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('shows loading when loadingConversations is true and no conversations', () => {
    jest.spyOn(ConversationHook, 'useConversation').mockReturnValue({
      conversations: [],
      loading: true,
      fetchCustomerConversations,
    } as any);
    render(<App />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('shows no conversations message when conversations is empty', () => {
    jest.spyOn(ConversationHook, 'useConversation').mockReturnValue({
      conversations: [],
      loading: false,
      fetchCustomerConversations,
    } as any);
    render(<App />);
    expect(screen.getByText('msg.noConversations')).toBeInTheDocument();
    expect(screen.getByText('msg.startNewConversation')).toBeInTheDocument();
  });

  it('calls onSendMessage when Enter is pressed in MessageInput', async () => {
    render(<App />);
    const input = screen.getByTestId('message-input');
    fireEvent.keyDown(input, {
      key: 'Enter',
      target: { value: 'Test message' },
    });
    await waitFor(() => {
      expect(
        screen
          .getAllByTestId('chat-message')
          .some((el) => el.textContent === 'Test message')
      ).toBe(true);
    });
  });
});
