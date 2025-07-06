import { getAllColors, getColorById } from '../colorApis';
import client from '../request';

// Mock helper env
jest.mock('../../../helpers/env', () => ({
  VITE_REDIRECT_URI: 'http://localhost/redirect',
  VITE_AUTH_URI: 'http://localhost/auth',
  VITE_CLIENT_ID: 'client-id',
  VITE_BACKEND_URL: 'http://localhost/api',
  VITE_HUGGINGFACE_API_KEY: '',
  SERVICE_ID: 'service-id',
  TEMPLATE_ID: 'template-id',
  PUBLIC_KEY: 'public-key',
  VITE_SOCKET_CHAT_URL: 'ws://localhost/socket',
}));

jest.mock('../request');

describe('colorApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('getColorById should call client.get with correct URL and return data', async () => {
    const mockData = {
      timestamp: '2024-07-06T12:00:00Z',
      httpStatus: 'OK',
      isSuccess: true,
      data: {
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
        content: [
          {
            id: '1',
            name: 'Red',
            code: '#FF0000',
            createdAt: '2024-07-06T12:00:00Z',
            createdBy: 'admin',
            updatedAt: '2024-07-06T12:00:00Z',
            updatedBy: 'admin',
          },
        ],
        number: 0,
        sort: { sorted: false, unsorted: true, empty: true },
        empty: false,
      },
    };
    (client.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await getColorById('1');
    expect(client.get).toHaveBeenCalledWith('/colors/1');
    expect(result).toEqual(mockData);
  });

  it('should throw error if client.get rejects', async () => {
    (client.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    await expect(getAllColors()).rejects.toThrow('Network error');
    await expect(getColorById('1')).rejects.toThrow('Network error');
  });
});