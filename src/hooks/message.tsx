import { useState, useCallback } from 'react';
import { getMessagesByConversationIdPaginated } from '../services/apis/messageApis';
import { MessageResponse } from '../interfaces/message/MessageResponse';

interface MessageState {
  messages: MessageResponse[];
  loading: boolean;
  pagination: {
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
  };
}

export const useMessage = () => {
  const [state, setState] = useState<MessageState>({
    messages: [],
    loading: false,
    pagination: {
      page: 0,
      size: 10,
      totalPages: 0,
      totalElements: 0,
    },
  });

  /**
   * Fetch messages for a conversation with pagination
   *
   * @param conversationId ID of the conversation
   * @param page Zero-based page index
   * @param size Number of items per page
   * @param sort Optional sort parameters
   */
  const fetchMessages = useCallback(
    async (
      conversationId: string,
      page: number = 0,
      size: number = 10,
      sort: string[] = ['createdAt,asc']
    ): Promise<void> => {
      if (!conversationId) {
        setState((prev) => ({
          ...prev,
          error: 'Conversation ID is required',
        }));
        return;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await getMessagesByConversationIdPaginated(
          conversationId,
          page,
          size,
          sort
        );

        if (response.isSuccess && response.data) {
          setState({
            messages: response.data.content,
            loading: false,
            pagination: {
              page: response.data.pageable?.pageNumber || page,
              size: response.data.pageable?.pageSize || size,
              totalPages: response.data.totalPages || 0,
              totalElements: response.data.totalElements || 0,
            },
          });
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unexpected error occurred';
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      }
    },
    []
  );

  /**
   * Change the current page
   */
  const changePage = useCallback(
    (conversationId: string, newPage: number, sort?: string[]) => {
      fetchMessages(conversationId, newPage, state.pagination.size, sort);
    },
    [fetchMessages, state.pagination.size]
  );

  /**
   * Change the page size
   */
  const changePageSize = useCallback(
    (conversationId: string, newSize: number, sort?: string[]) => {
      fetchMessages(conversationId, 0, newSize, sort);
    },
    [fetchMessages]
  );

  return {
    messages: state.messages,
    loading: state.loading,
    pagination: state.pagination,
    fetchMessages,
    changePage,
    changePageSize,
  };
};
