import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import Breadcrumb from '../../components/shared/Breadcrumb';
import ChatContainer from '../../components/page/chat/ChatContainer';
import MessageInput from '../../components/page/chat/MessageInput';
import { useConversation } from '../../hooks/conversation';
import { useMessage } from '../../hooks/message';
import { t } from '../../helpers/i18n';
import { RoleChat } from '../../interfaces/message/RoleChat';
import Loading from '../../components/shared/Loading';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const App: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const stompClient = useRef<Client | null>(null);

  // State for conversation and message handling
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Get conversations and messages using hooks
  const {
    conversations,
    loading: loadingConversations,
    fetchCustomerConversations,
  } = useConversation();

  const {
    messages: apiMessages,
    loading: loadingMessages,
    pagination,
    fetchMessages,
    changePage,
  } = useMessage();

  // Connect to WebSocket when conversation is selected
  const connectWebSocket = useCallback(() => {
    if (!selectedConversationId || !userInfo?.id || isConnected) return;

    // Create socket and STOMP client
    const socket = new SockJS('https://haquocbao.id.vn:8080/api/v1/ws'); // Replace with your actual backend URL
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Connect handler
    client.onConnect = (frame) => {
      console.log('Connected to WebSocket:', frame);
      setIsConnected(true);

      // Subscribe to conversation topic
      client.subscribe(
        `/topic/conversation/${selectedConversationId}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);

          // Add received message to the messages list
          //addMessage(receivedMessage);

          // Scroll to bottom if message is new
          setTimeout(scrollToBottom, 100);
        }
      );

      // Send join message
      client.publish({
        destination: `/app/chat.join/${selectedConversationId}`,
        body: JSON.stringify({
          userId: userInfo.id,
          conversationId: selectedConversationId,
          messageType: 'JOIN',
        }),
      });
    };

    // Error handler
    client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      setIsConnected(false);
    };

    // Disconnect handler
    client.onDisconnect = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
    };

    // Activate the client
    client.activate();
    stompClient.current = client;

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [selectedConversationId, userInfo?.id, isConnected]);

  // Fetch conversations when component mounts
  useEffect(() => {
    if (userInfo?.id) {
      fetchCustomerConversations(userInfo.id);
    }
  }, [userInfo?.id]);

  // Select first conversation when available
  useEffect(() => {
    if (conversations?.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  // Fetch messages when conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId, 0, 20, ['createdAt,desc']);
      setIsInitialLoad(true);
      connectWebSocket();
    }
  }, [selectedConversationId]);

  // Clean up WebSocket connection when component unmounts
  useEffect(() => {
    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  // Scroll to bottom on initial load or new message
  useEffect(() => {
    if (apiMessages.length && isInitialLoad) {
      scrollToBottom();
      setIsInitialLoad(false);
    }
  }, [apiMessages, isInitialLoad]);

  // Check if there are more pages to load
  useEffect(() => {
    setHasMoreMessages(pagination.page < pagination.totalPages - 1);
  }, [pagination]);

  // Handle scroll to detect when user scrolls to top to load more messages
  const handleScroll = useCallback(() => {
    const container = messageContainerRef.current;
    if (!container || loadingMessages || !hasMoreMessages) return;

    // If user has scrolled near the top (within 100px), load more messages
    if (container.scrollTop < 100) {
      changePage(selectedConversationId as string, pagination.page + 1, [
        'createdAt,desc',
      ]);
    }
  }, [
    selectedConversationId,
    loadingMessages,
    pagination.page,
    hasMoreMessages,
    changePage,
  ]);

  // Add scroll event listener
  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Send a new message via WebSocket
  const handleSendMessage = async (text: string) => {
    if (
      !text.trim() ||
      !selectedConversationId ||
      !userInfo?.id ||
      !stompClient.current?.connected
    )
      return;

    try {
      // Send message via WebSocket
      stompClient.current.publish({
        destination: `/app/chat.sendMessage/${selectedConversationId}`,
        body: JSON.stringify({
          content: text,
          userId: userInfo.id,
          conversationId: selectedConversationId,
          messageType: 'TEXT',
        }),
      });

      // Note: We don't need to fetch messages here as the WebSocket subscription
      // will receive the message we just sent and add it to the message list
    } catch (error) {
      console.error('Failed to send message:', error);

      // Fallback: refresh messages if WebSocket fails
      fetchMessages(selectedConversationId, 0, pagination.size, [
        'createdAt,desc',
      ]);
      setTimeout(scrollToBottom, 100);
    }
  };

  // If messages come back in descending order (newest first), reverse them for display
  const displayMessages = [...apiMessages].reverse();

  return (
    <div className="flex mt-10 px-8 py-8 flex-col h-screen bg-gray-50 bg-white text-gray-800">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.chat'), path: '/chat' },
        ]}
      />

      {/* Connection status indicator */}
      <div
        className={`text-xs px-2 py-1 rounded-full inline-block self-end mb-2 ${
          isConnected
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {isConnected ? 'Connected' : 'Disconnected'}
      </div>

      {loadingConversations && !conversations.length ? (
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
      ) : conversations.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              {t('msg.noConversations')}
            </h2>
            <p className="text-gray-500">{t('msg.startNewConversation')}</p>
          </div>
        </div>
      ) : (
        <>
          <div
            ref={messageContainerRef}
            className="flex-1 overflow-y-auto relative"
          >
            {loadingMessages && pagination.page > 0 && (
              <div className="sticky top-0 w-full bg-gray-100 p-2 text-center">
                <Loading />
              </div>
            )}

            <ChatContainer
              messages={displayMessages.map((msg) => ({
                id: msg.id,
                text: msg.content,
                sender: msg.roleChat === RoleChat.CUSTOMER ? 'user' : 'other',
                timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              }))}
              messagesEndRef={messagesEndRef}
            />
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </>
      )}
    </div>
  );
};

export default App;
