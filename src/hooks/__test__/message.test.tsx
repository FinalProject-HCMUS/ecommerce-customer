import { renderHook, act } from '@testing-library/react';
import * as messageApis from '../../services/apis/messageApis';
import { useMessage } from '../message';

jest.mock('../../services/apis/messageApis', () => ({
  getMessagesByConversationIdPaginated: jest.fn(),
}));

describe('useMessage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchMessages should call API and update state with messages and pagination', async () => {
    const mockMessages = [
      {
        id: 'm1',
        content: 'Hello',
        userId: 'u1',
        conversationId: 'c1',
        messageType: 'text',
        createdAt: '2023-01-01T00:00:00Z',
        createdBy: 'u1',
        updatedAt: '2023-01-01T00:00:00Z',
        updatedBy: 'u1',
        role: 'user',
      },
    ];
    const mockPageable = {
      content: mockMessages,
      totalPages: 2,
      totalElements: 1,
      pageable: { pageNumber: 0, pageSize: 10 },
    };
    (
      messageApis.getMessagesByConversationIdPaginated as jest.Mock
    ).mockResolvedValueOnce({
      isSuccess: true,
      data: mockPageable,
    });

    const { result } = renderHook(() => useMessage());
    await act(async () => {
      await result.current.fetchMessages('c1', 0, 10, ['createdAt,asc']);
    });

    expect(
      messageApis.getMessagesByConversationIdPaginated
    ).toHaveBeenCalledWith('c1', 0, 10, ['createdAt,asc']);
    expect(result.current.messages).toEqual(mockMessages);
    expect(result.current.pagination.page).toBe(0);
    expect(result.current.pagination.totalPages).toBe(2);
    expect(result.current.hasMore).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('fetchMessages should set hasMore false if not success', async () => {
    (
      messageApis.getMessagesByConversationIdPaginated as jest.Mock
    ).mockResolvedValueOnce({
      isSuccess: false,
      data: null,
    });

    const { result } = renderHook(() => useMessage());
    await act(async () => {
      await result.current.fetchMessages('c1', 0, 10, ['createdAt,asc']);
    });

    expect(result.current.hasMore).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});
