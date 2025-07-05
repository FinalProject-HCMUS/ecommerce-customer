import { renderHook, act } from '@testing-library/react';
import * as productApis from '../../services/apis/productApis';
import { useProducts } from '../products';

jest.mock('../../services/apis/productApis', () => ({
  getAllProducts: jest.fn(),
  getProductById: jest.fn(),
  getTopProducts: jest.fn(),
}));

describe('useProducts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchAllProducts should call getAllProducts and return data', async () => {
    const mockPageable = {
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 16,
        unpaged: false,
        offset: 0,
        sort: { sorted: false, unsorted: true, empty: true },
      },
      numberOfElements: 1,
      size: 16,
      content: [
        {
          id: '1',
          name: 'Product 1',
          description: 'desc',
          cost: 100,
          total: 10,
          price: 120,
          discountPercent: 0,
          enable: true,
          inStock: true,
          mainImageUrl: 'img.png',
          averageRating: 4.5,
          reviewCount: 2,
          categoryId: 'cat1',
          createdAt: '2023-01-01',
          updatedAt: '2023-01-02',
          createdBy: 'admin',
          updatedBy: 'admin',
        },
      ],
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    (productApis.getAllProducts as jest.Mock).mockResolvedValueOnce({ data: mockPageable });

    const { result } = renderHook(() => useProducts());
    let res: any;
    await act(async () => {
      res = await result.current.fetchAllProducts({ page: 0, perPage: 16 });
    });

    expect(productApis.getAllProducts).toHaveBeenCalledWith(
      0, 16, undefined, undefined, undefined, undefined, undefined, undefined, undefined
    );
    expect(res).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
  });

  it('fetchProductById should call getProductById and return product', async () => {
    const mockProduct = {
      id: '1',
      name: 'Product 1',
      description: 'desc',
      cost: 100,
      total: 10,
      price: 120,
      discountPercent: 0,
      enable: true,
      inStock: true,
      mainImageUrl: 'img.png',
      averageRating: 4.5,
      reviewCount: 2,
      categoryId: 'cat1',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      createdBy: 'admin',
      updatedBy: 'admin',
    };
    (productApis.getProductById as jest.Mock).mockResolvedValueOnce({ data: mockProduct });

    const { result } = renderHook(() => useProducts());
    let res: any;
    await act(async () => {
      res = await result.current.fetchProductById('1');
    });

    expect(productApis.getProductById).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockProduct);
    expect(result.current.loading).toBe(false);
  });

  it('fetchTopProducts should call getTopProducts and return data', async () => {
    const mockTopProducts = {
      pagination: {
        totalPages: 1,
        totalItems: 1,
        currentPage: 0,
      },
      topProducts: [
        {
          title: 'Top',
          data: [],
        },
      ],
    };
    (productApis.getTopProducts as jest.Mock).mockResolvedValueOnce({ data: mockTopProducts });

    const { result } = renderHook(() => useProducts());
    let res: any;
    await act(async () => {
      res = await result.current.fetchTopProducts(0, 30);
    });

    expect(productApis.getTopProducts).toHaveBeenCalledWith(0, 30);
    expect(res).toEqual(mockTopProducts);
    expect(result.current.loading).toBe(false);
  });
});