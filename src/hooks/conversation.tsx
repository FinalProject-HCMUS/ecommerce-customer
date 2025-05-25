import { useState } from 'react';
import { getConversationsByCustomerId } from '../services/apis/conversationApis';
import { ConversationResponse } from '../interfaces/message/ConversationResponse';

interface ConversationState {
  conversations: ConversationResponse[];
  loading: boolean;
}

export const useConversation = () => {
  const [state, setState] = useState<ConversationState>({
    conversations: [],
    loading: false
  });

  const fetchCustomerConversations = async (customerId: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getConversationsByCustomerId(customerId);
      
      if (response.isSuccess && response.data) {
        setState({
          conversations: response.data,
          loading: false,
        });
      }
    } finally {
      setState(prev => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return {
    conversations: state.conversations,
    loading: state.loading,
    fetchCustomerConversations
  };
};