import * as detailOrderApis from '../detailOrderApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;

describe('detailOrderApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getOrderDetailsByOrderId should call client.get with correct url and return data', async () => {
    const mockOrderDetail = {
      productCost: 100,
      quantity: 2,
      unitPrice: 120,
      total: 240,
      product: { id: 'p1', name: 'Product 1' },
      orderId: 'o1',
      itemId: 'i1',
      id: 'd1',
      color: { id: 'c1', name: 'Red' },
      size: { id: 's1', name: 'M' },
      limitedQuantity: 10,
      createdAt: '2023-01-01T00:00:00Z',
      createdBy: 'admin',
      updatedAt: '2023-01-02T00:00:00Z',
      updatedBy: 'admin',
      reviewed: false,
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: [mockOrderDetail],
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await detailOrderApis.getOrderDetailsByOrderId('o1');
    expect(mockGet).toHaveBeenCalledWith('/order-details/order/o1');
    expect(res).toEqual(mockResponse);
  });
});
