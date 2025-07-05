import * as conversationApis from '../conversationApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;

describe('conversationApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getConversationsByCustomerId should call client.get with correct url and return data', async () => {
    const mockConversation = {
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
        senderId: 'c1',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        createdBy: 'c1',
        updatedBy: 'c1',
      },
      createdAt: '2023-01-01T00:00:00Z',
      createdBy: 'c1',
      updatedAt: '2023-01-01T00:00:00Z',
      updatedBy: 'c1',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: [mockConversation],
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await conversationApis.getConversationsByCustomerId('c1');
    expect(mockGet).toHaveBeenCalledWith('/conversations/customer/c1');
    expect(res).toEqual(mockResponse);
  });
});