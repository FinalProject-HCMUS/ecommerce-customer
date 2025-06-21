import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';
import Breadcrumb from '../../components/shared/Breadcrumb';
import ChatContainer from '../../components/page/chat/ChatContainer';
import MessageInput from '../../components/page/chat/MessageInput';
import { useConversation } from '../../hooks/conversation';
import { useMessage } from '../../hooks/message';
import { t } from '../../helpers/i18n';
import Loading from '../../components/shared/Loading';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { MessageResponse } from '../../interfaces';
import { showError } from '../../utils/messageRender';
import { common } from '../../constants';

const SOCKET_URL = import.meta.env.VITE_SOCKET_CHAT_URL;
const { MESSAGE_PER_PAGE } = common;

const App: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [pendingMessages, setPendingMessages] = useState<MessageResponse[]>([]);
  const stompClient = useRef<Client | null>(null);

  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);

  const [isConnected, setIsConnected] = useState(false);

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
  } = useMessage();

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      const container = messageContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  const processReceivedMessage = useCallback(
    (receivedMessage: MessageResponse) => {
      if (receivedMessage.userId === userInfo?.id) {
        return;
      }

      // Transform the received message to match your MessageResponse interface
      const newMessage: MessageResponse = {
        ...receivedMessage,
        id: receivedMessage.id || crypto.randomUUID(),
        role: receivedMessage.userId === userInfo?.id ? 'user' : 'admin',
        createdAt: new Date().toISOString(),
      };
      setPendingMessages((prev) => [...prev, newMessage]);
      console.log('Pending messages after processing:', pendingMessages);
      setTimeout(scrollToBottom, 100);
    },
    [userInfo?.id, scrollToBottom]
  );

  const connectWebSocket = useCallback(() => {
    if (!selectedConversationId || !userInfo?.id || isConnected) return;

    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      console.log('Connected to WebSocket:', frame);
      setIsConnected(true);

      client.subscribe(
        `/topic/conversation/${selectedConversationId}`,
        (message) => {
          const receivedMessage = JSON.parse(message.body);
          processReceivedMessage(receivedMessage);
          setTimeout(scrollToBottom, 100);
        }
      );
    };

    client.onStompError = (frame) => {
      console.error('STOMP error:', frame);
      setIsConnected(false);
    };

    client.onDisconnect = () => {
      setIsConnected(false);
    };

    client.activate();
    stompClient.current = client;

    return () => {
      if (client.connected) {
        client.deactivate();
      }
    };
  }, [selectedConversationId, userInfo?.id, isConnected, scrollToBottom]);

  useEffect(() => {
    if (userInfo?.id) {
      fetchCustomerConversations(userInfo.id);
    }
  }, [userInfo?.id]);

  useEffect(() => {
    if (conversations?.length > 0 && !selectedConversationId) {
      setSelectedConversationId(conversations[0].id);
    }
  }, [conversations, selectedConversationId]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedConversationId) {
        await fetchMessages(selectedConversationId, 0, MESSAGE_PER_PAGE, [
          'createdAt,desc',
        ]);
        connectWebSocket();
      }
    };
    fetchData();
  }, [selectedConversationId]);

  // Scroll to bottom when messages are first loaded
  useEffect(() => {
    if (apiMessages.length > 0 && !loadingMessages) {
      setTimeout(scrollToBottom, 100);
    }
  }, [apiMessages.length, loadingMessages, scrollToBottom]);

  // Scroll to bottom when displayMessages change (including pending messages)
  useEffect(() => {
    if (pendingMessages.length > 0) {
      setTimeout(scrollToBottom, 100);
    }
  }, [pendingMessages.length, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const handleSendMessage = async (text: string) => {
    if (
      !text.trim() ||
      !selectedConversationId ||
      !userInfo?.id ||
      !stompClient.current?.connected
    )
      return;

    const newMessage: MessageResponse = {
      content: text,
      userId: userInfo.id,
      conversationId: selectedConversationId,
      messageType: 'TEXT',
      createdAt: new Date().toISOString(),
      role: 'user',
      createdBy: userInfo.id,
      id: crypto.randomUUID(),
    };

    setPendingMessages((prev) => [...prev, newMessage]);

    // Scroll after adding the message (will trigger via useEffect above)

    try {
      stompClient.current.publish({
        destination: `/app/chat.sendMessage/${selectedConversationId}`,
        body: JSON.stringify(newMessage),
      });
    } catch (error) {
      showError('Failed to send message' + error);
      fetchMessages(selectedConversationId, 0, pagination.size, [
        'createdAt,desc',
      ]);
    }
  };

  useEffect(() => {
    setPendingMessages((pending) =>
      pending.filter(
        (pm) =>
          !apiMessages.some(
            (am) =>
              am.content === pm.content &&
              am.createdAt === pm.createdAt &&
              am.userId === pm.userId
          )
      )
    );
  }, [apiMessages]);

  const displayMessages = [...apiMessages, ...pendingMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  console.log('Display messages:', displayMessages);

  return (
    <div className="flex mt-10 px-8 py-8 flex-col h-screen bg-gray-50 bg-white text-gray-800 overflow-hidden">
      <Breadcrumb
        items={[
          { label: t('breadcrumb.home'), path: '/' },
          { label: t('breadcrumb.chat'), path: '/chat' },
        ]}
      />

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
                ...msg,
                role: msg.userId === userInfo?.id ? 'user' : 'admin',
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
