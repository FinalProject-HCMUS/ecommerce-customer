import { renderHook, act } from '@testing-library/react';
import * as conversationApis from '../../services/apis/conversationApis';
import { useConversation } from '../conversation';

jest.mock('../../services/apis/conversationApis', () => ({
  getConversationsByCustomerId: jest.fn(),
}));

describe('useConversation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCustomerConversations should call getConversationsByCustomerId and update state', async () => {
    const mockConversations = [
      {
        id: '1',
        customer: {
          id: 'c1',
          email: 'customer@example.com',
          phoneNumber: '123456789',
          firstName: 'John',
          lastName: 'Doe',
          enabled: true,
        },
        isAdminRead: false,
        isCustomerRead: true,
        latestMessage: {
          id: 'm1',
          content: 'Hello',
          userId: 'c1',
          createdAt: '2023-01-01T00:00:00Z',
          updatedAt: '2023-01-01T00:00:00Z',
          createdBy: 'c1',
          updatedBy: 'c1',
        },
        createdAt: '2023-01-01T00:00:00Z',
        createdBy: 'c1',
        updatedAt: '2023-01-01T00:00:00Z',
        updatedBy: 'c1',
      },
    ];
    (conversationApis.getConversationsByCustomerId as jest.Mock).mockResolvedValueOnce({
      isSuccess: true,
      data: mockConversations,
    });

    const { result } = renderHook(() => useConversation());
    await act(async () => {
      await result.current.fetchCustomerConversations('c1');
    });

    expect(conversationApis.getConversationsByCustomerId).toHaveBeenCalledWith('c1');
    expect(result.current.conversations).toEqual(mockConversations);
    expect(result.current.loading).toBe(false);
  });
});