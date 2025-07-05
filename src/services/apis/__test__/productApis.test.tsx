import * as productApis from '../productApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;

describe('productApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllProducts should call client.get with correct params and return data', async () => {
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
      content: [{
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
      }],
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

    const res = await productApis.getAllProducts(0, 10, ['createdAt,desc'], 'search', 'cat1', 100, 200, 'red', 'M');
    expect(mockGet).toHaveBeenCalledWith('/products', {
      params: {
        page: 0,
        perpage: 10,
        sort: 'createdAt,desc',
        keysearch: 'search',
        category: 'cat1',
        fromprice: 100,
        toprice: 200,
        color: 'red',
        size: 'M',
      },
    });
    expect(res).toEqual(mockResponse);
  });

  it('getProductById should call client.get with correct url and return data', async () => {
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
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockProduct,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await productApis.getProductById('1');
    expect(mockGet).toHaveBeenCalledWith('/products/1');
    expect(res).toEqual(mockResponse);
  });

  it('getTopProducts should call client.get with correct params and return data', async () => {
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
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockTopProducts,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await productApis.getTopProducts(0, 30);
    expect(mockGet).toHaveBeenCalledWith('/products/top-products', {
      params: { page: 0, size: 30 },
    });
    expect(res).toEqual(mockResponse);
  });

  it('getProductImagesByProductId should call client.get with correct url and return data', async () => {
    const mockImages = [
      {
        id: 'img1',
        url: 'img.png',
        productId: '1',
        createdAt: '2023-01-01',
        createdBy: 'admin',
        updatedAt: '2023-01-02',
        updatedBy: 'admin',
      },
    ];
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockImages,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await productApis.getProductImagesByProductId('1');
    expect(mockGet).toHaveBeenCalledWith('/product-images/product/1');
    expect(res).toEqual(mockResponse);
  });

  it('getProductColorSizesByProductId should call client.get with correct url and return data', async () => {
    const mockColorSizes = [
      {
        id: 'cs1',
        quantity: 5,
        product: {
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
        color: { id: 'c1', name: 'Red', code: '#FF0000' },
        size: { id: 's1', name: 'M' },
        createdAt: '2023-01-01',
        createdBy: 'admin',
        updatedAt: '2023-01-02',
        updatedBy: 'admin',
      },
    ];
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockColorSizes,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await productApis.getProductColorSizesByProductId('1');
    expect(mockGet).toHaveBeenCalledWith('/product-color-sizes/product/1');
    expect(res).toEqual(mockResponse);
  });
});