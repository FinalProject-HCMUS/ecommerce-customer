import * as orderApis from '../orderApis';
import client from '../request';
import { Status } from '../../../interfaces/order/Status';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

const mockPost = client.post as jest.Mock;
const mockGet = client.get as jest.Mock;

describe('orderApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('checkout should call client.post with correct args and return data', async () => {
    const mockOrder = {
      id: 'o1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      status: Status.NEW,
      orderDate: '2023-01-01',
      deliveryDate: '2023-01-02',
      paymentMethod: 'COD',
      shippingCost: 10,
      productCost: 100,
      subTotal: 110,
      total: 120,
      customerId: 'c1',
      orderTracks: [],
      createdAt: '2023-01-01',
      createdBy: 'admin',
      updatedAt: '2023-01-02',
      updatedBy: 'admin',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockOrder,
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const req = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      address: '123 Main St',
      paymentMethod: 'COD',
      orderDetails: [{ itemId: 'i1', quantity: 2 }],
    };
    const res = await orderApis.checkout(req);
    expect(mockPost).toHaveBeenCalledWith('/orders/checkout', req);
    expect(res).toEqual(mockResponse);
  });

  it('createVNPayPayment should call client.post with correct args and return data', async () => {
    mockPost.mockResolvedValueOnce({ data: 'vnpay-url' });
    const req = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      address: '123 Main St',
      paymentMethod: 'VNPAY',
      orderDetails: [{ itemId: 'i1', quantity: 2 }],
    };
    const res = await orderApis.createVNPayPayment(req);
    expect(mockPost).toHaveBeenCalledWith('/vn-payment/create', req);
    expect(res).toBe('vnpay-url');
  });

  it('searchOrders should call client.get with correct query params and return data', async () => {
    const mockOrder = {
      id: 'o1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123456789',
      status: Status.NEW,
      orderDate: '2023-01-01',
      deliveryDate: '2023-01-02',
      paymentMethod: 'COD',
      shippingCost: 10,
      productCost: 100,
      subTotal: 110,
      total: 120,
      customerId: 'c1',
      orderTracks: [],
      createdAt: '2023-01-01',
      createdBy: 'admin',
      updatedAt: '2023-01-02',
      updatedBy: 'admin',
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
      content: [mockOrder],
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

    const params = {
      keyword: 'John',
      status: Status.NEW,
      page: 0,
      size: 10,
      sort: ['orderDate,desc'],
    };
    const res = await orderApis.searchOrders(params);
    expect(mockGet).toHaveBeenCalledWith(
      '/orders/search?keyword=John&status=NEW&page=0&size=10&sort=orderDate%2Cdesc'
    );
    expect(res).toEqual(mockResponse);
  });
});
