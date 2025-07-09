import { renderHook, act } from '@testing-library/react';
import * as productApis from '../../services/apis/productApis';
import { useProductImages } from '../product-images';

jest.mock('../../services/apis/productApis', () => ({
  getProductImagesByProductId: jest.fn(),
}));

describe('useProductImages', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchProductImages should call API and return data', async () => {
    const mockImages = [
      {
        id: 'img1',
        url: 'https://img.com/1.png',
        productId: 'p1',
        createdAt: '2023-01-01',
        createdBy: 'admin',
        updatedAt: '2023-01-02',
        updatedBy: 'admin',
      },
    ];
    (
      productApis.getProductImagesByProductId as jest.Mock
    ).mockResolvedValueOnce({
      data: mockImages,
    });

    const { result } = renderHook(() => useProductImages());
    let res: any;
    await act(async () => {
      res = await result.current.fetchProductImages('p1');
    });

    expect(productApis.getProductImagesByProductId).toHaveBeenCalledWith('p1');
    expect(res).toEqual(mockImages);
    expect(result.current.loading).toBe(false);
  });
});
