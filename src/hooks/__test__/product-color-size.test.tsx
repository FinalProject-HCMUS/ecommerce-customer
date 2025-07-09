import { renderHook, act } from '@testing-library/react';
import * as productApis from '../../services/apis/productApis';
import { useProductColorSize } from '../product-color-size';

jest.mock('../../services/apis/productApis', () => ({
  getProductColorSizesByProductId: jest.fn(),
}));

describe('useProductColorSize', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchProductColorSizes should call API and return data', async () => {
    const mockData = [
      {
        id: 'pcs1',
        quantity: 5,
        product: { id: 'p1', name: 'Product 1' },
        color: { id: 'c1', name: 'Red', code: '#FF0000' },
        size: { id: 's1', name: 'M', minHeight: 160 },
        createdAt: '2023-01-01',
        createdBy: 'admin',
        updatedAt: '2023-01-02',
        updatedBy: 'admin',
      },
    ];
    (
      productApis.getProductColorSizesByProductId as jest.Mock
    ).mockResolvedValueOnce({
      data: mockData,
    });

    const { result } = renderHook(() => useProductColorSize());
    let res: any;
    await act(async () => {
      res = await result.current.fetchProductColorSizes('p1');
    });

    expect(productApis.getProductColorSizesByProductId).toHaveBeenCalledWith(
      'p1'
    );
    expect(res).toEqual(mockData);
    expect(result.current.loading).toBe(false);
  });
});
