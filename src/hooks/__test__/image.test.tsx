import { renderHook, act } from '@testing-library/react';
import { useImage } from '../image';
import { imageApi } from '../../services/apis/imageApis';

jest.mock('../../services/apis/imageApis', () => ({
  imageApi: {
    uploadImage: jest.fn(),
    deleteImage: jest.fn(),
  },
}));

describe('useImage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('uploadImage should set uploading, call api, set imageUrl and return url', async () => {
    const mockFile = new File(['dummy'], 'test.png', { type: 'image/png' });
    const mockResponse = { isSuccess: true, data: 'http://img.com/test.png' };
    (imageApi.uploadImage as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useImage());
    let res: any;
    await act(async () => {
      res = await result.current.uploadImage(mockFile);
    });

    expect(imageApi.uploadImage).toHaveBeenCalledWith(mockFile);
    expect(res).toBe('http://img.com/test.png');
    expect(result.current.imageUrl).toBe('http://img.com/test.png');
    expect(result.current.uploading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('uploadImage should set error if api fails', async () => {
    const mockFile = new File(['dummy'], 'test.png', { type: 'image/png' });
    (imageApi.uploadImage as jest.Mock).mockRejectedValueOnce(
      new Error('fail')
    );

    const { result } = renderHook(() => useImage());
    let res: any;
    await act(async () => {
      res = await result.current.uploadImage(mockFile);
    });

    expect(res).toBeNull();
    expect(result.current.uploading).toBe(false);
    expect(result.current.error).toBe('fail');
  });

  it('uploadImage should set error if response is not success', async () => {
    const mockFile = new File(['dummy'], 'test.png', { type: 'image/png' });
    (imageApi.uploadImage as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
    });

    const { result } = renderHook(() => useImage());
    let res: any;
    await act(async () => {
      res = await result.current.uploadImage(mockFile);
    });

    expect(res).toBeNull();
    expect(result.current.uploading).toBe(false);
    expect(result.current.error).toBe('Failed to upload image');
  });

  it('deleteImage should set deleting, call api, clear imageUrl and return true', async () => {
    const mockUrl = 'http://img.com/test.png';
    const mockResponse = { isSuccess: true, data: true };
    (imageApi.deleteImage as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useImage());
    // Set imageUrl first
    act(() => {
      result.current.uploadImage = jest.fn().mockImplementation(() => {
        result.current.imageUrl = mockUrl;
      });
    });

    let res: any;
    await act(async () => {
      res = await result.current.deleteImage(mockUrl);
    });

    expect(imageApi.deleteImage).toHaveBeenCalledWith(mockUrl);
    expect(res).toBe(true);
    expect(result.current.imageUrl).toBeNull();
    expect(result.current.deleting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deleteImage should set error if api fails', async () => {
    const mockUrl = 'http://img.com/test.png';
    (imageApi.deleteImage as jest.Mock).mockRejectedValueOnce(
      new Error('fail')
    );

    const { result } = renderHook(() => useImage());
    let res: any;
    await act(async () => {
      res = await result.current.deleteImage(mockUrl);
    });

    expect(res).toBe(false);
    expect(result.current.deleting).toBe(false);
    expect(result.current.error).toBe('fail');
  });

  it('deleteImage should set error if response is not success', async () => {
    const mockUrl = 'http://img.com/test.png';
    (imageApi.deleteImage as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
    });

    const { result } = renderHook(() => useImage());
    let res: any;
    await act(async () => {
      res = await result.current.deleteImage(mockUrl);
    });

    expect(res).toBe(false);
    expect(result.current.deleting).toBe(false);
    expect(result.current.error).toBe('Failed to delete image');
  });

  it('clearError should set error to null', () => {
    const { result } = renderHook(() => useImage());
    act(() => {
      result.current.clearError();
    });
    expect(result.current.error).toBeNull();
  });

  it('reset should reset all state', () => {
    const { result } = renderHook(() => useImage());
    act(() => {
      result.current.reset();
    });
    expect(result.current.imageUrl).toBeNull();
    expect(result.current.uploading).toBe(false);
    expect(result.current.deleting).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
