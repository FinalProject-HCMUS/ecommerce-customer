import { imageApi } from '../imageApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockPost = client.post as jest.Mock;
const mockDelete = client.delete as jest.Mock;

describe('imageApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uploadImage should call client.post with correct args and return data', async () => {
    const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: 'http://example.com/image.png',
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const res = await imageApi.uploadImage(mockFile);

    expect(mockPost).toHaveBeenCalledWith(
      '/images/upload',
      expect.any(FormData),
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    // Check that FormData contains the file
    const formDataArg = mockPost.mock.calls[0][1] as FormData;
    expect(formDataArg.get('file')).toBe(mockFile);

    expect(res).toEqual(mockResponse);
  });

  it('deleteImage should call client.delete with correct args and return data', async () => {
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: true,
    };
    mockDelete.mockResolvedValueOnce({ data: mockResponse });

    const imageUrl = 'http://example.com/image.png';
    const res = await imageApi.deleteImage(imageUrl);

    expect(mockDelete).toHaveBeenCalledWith(
      '/images/delete',
      { params: { imageUrl } }
    );
    expect(res).toEqual(mockResponse);
  });
});