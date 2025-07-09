import { MessageResponse } from '../../../interfaces';
import * as messageApis from '../messageApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;

describe('messageApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getMessagesByConversationIdPaginated should call client.get with correct url and return data', async () => {
    const mockMessage: MessageResponse = {
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
    };
    const mockPageable = {
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 10,
        unpaged: false,
        offset: 0,
        sort: { sorted: false, unsorted: true, empty: true },
      },
      numberOfElements: 1,
      size: 10,
      content: [mockMessage],
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockPageable,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await messageApis.getMessagesByConversationIdPaginated(
      'c1',
      0,
      10,
      ['createdAt,desc']
    );
    expect(mockGet).toHaveBeenCalledWith(
      '/messages/conversation/c1/paginated?page=0&size=10&sort=createdAt%2Cdesc'
    );
    expect(res).toEqual(mockResponse);
  });
});
