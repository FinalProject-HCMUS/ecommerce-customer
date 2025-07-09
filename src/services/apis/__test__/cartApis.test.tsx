import * as cartApis from '../cartApis';
import client from '../request';

jest.mock('../request', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockGet = client.get as jest.Mock;
const mockPost = client.post as jest.Mock;
const mockPut = client.put as jest.Mock;
const mockDelete = client.delete as jest.Mock;

describe('cartApis', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getCartItemById should call client.get with correct url and return data', async () => {
    const mockCartItem = {
      id: '1',
      quantity: 2,
      product: {},
      color: 'red',
      size: 'M',
      userId: 'u1',
      itemId: 'i1',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockCartItem,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await cartApis.getCartItemById('1');
    expect(mockGet).toHaveBeenCalledWith('/cart-items/1');
    expect(res).toEqual(mockResponse);
  });

  it('getCartItemsByUserId should call client.get with correct url and return data', async () => {
    const mockCartItems = [
      {
        id: '1',
        quantity: 2,
        product: {},
        color: 'red',
        size: 'M',
        userId: 'u1',
        itemId: 'i1',
      },
    ];
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockCartItems,
    };
    mockGet.mockResolvedValueOnce({ data: mockResponse });

    const res = await cartApis.getCartItemsByUserId('u1');
    expect(mockGet).toHaveBeenCalledWith('/cart-items/user/u1');
    expect(res).toEqual(mockResponse);
  });

  it('createCartItem should call client.post with correct args and return data', async () => {
    const req = { quantity: 1, userId: 'u1', itemId: 'i1' };
    const mockCartItem = {
      id: '1',
      quantity: 1,
      product: {},
      color: 'blue',
      size: 'L',
      userId: 'u1',
      itemId: 'i1',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockCartItem,
    };
    mockPost.mockResolvedValueOnce({ data: mockResponse });

    const res = await cartApis.createCartItem(req);
    expect(mockPost).toHaveBeenCalledWith('/cart-items', req);
    expect(res).toEqual(mockResponse);
  });

  it('updateCartItem should call client.put with correct args and return data', async () => {
    const req = { quantity: 3 };
    const mockCartItem = {
      id: '1',
      quantity: 3,
      product: {},
      color: 'green',
      size: 'S',
      userId: 'u1',
      itemId: 'i1',
    };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockCartItem,
    };
    mockPut.mockResolvedValueOnce({ data: mockResponse });

    const res = await cartApis.updateCartItem('1', req);
    expect(mockPut).toHaveBeenCalledWith('/cart-items/1', req);
    expect(res).toEqual(mockResponse);
  });

  it('deleteCartItem should call client.delete with correct url and return data', async () => {
    const mockResponse = { timestamp: '', httpStatus: 'OK', isSuccess: true };
    mockDelete.mockResolvedValueOnce({ data: mockResponse });

    const res = await cartApis.deleteCartItem('1');
    expect(mockDelete).toHaveBeenCalledWith('/cart-items/1');
    expect(res).toEqual(mockResponse);
  });

  it('deleteCartItemByUserIdAndItemId should call client.delete with correct url and return data', async () => {
    const mockResponse = { timestamp: '', httpStatus: 'OK', isSuccess: true };
    mockDelete.mockResolvedValueOnce({ data: mockResponse });

    const res = await cartApis.deleteCartItemByUserIdAndItemId('u1', 'i1');
    expect(mockDelete).toHaveBeenCalledWith('/cart-items/user/u1/item/i1');
    expect(res).toEqual(mockResponse);
  });
});
