import { renderHook, act } from '@testing-library/react';
import * as cartApis from '../../services/apis/cartApis';
import { useCart } from '../cart';

jest.mock('../../services/apis/cartApis', () => ({
  getCartItemById: jest.fn(),
  getCartItemsByUserId: jest.fn(),
  createCartItem: jest.fn(),
  updateCartItem: jest.fn(),
  deleteCartItem: jest.fn(),
  deleteCartItemByUserIdAndItemId: jest.fn(),
}));

describe('useCart', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchCartItemById should call getCartItemById and return cart item', async () => {
    const mockCartItem = {
      id: '1',
      quantity: 2,
      product: {},
      color: 'red',
      size: 'M',
      userId: 'u1',
      itemId: 'i1',
    };
    (cartApis.getCartItemById as jest.Mock).mockResolvedValueOnce({ data: mockCartItem });

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.fetchCartItemById('1');
    });

    expect(cartApis.getCartItemById).toHaveBeenCalledWith('1');
    expect(res).toEqual(mockCartItem);
    expect(result.current.loading).toBe(false);
  });

  it('fetchCartItemById should return null on error', async () => {
    (cartApis.getCartItemById as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.fetchCartItemById('1');
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('fetchCartItemsByUserId should call getCartItemsByUserId and return cart items', async () => {
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
    (cartApis.getCartItemsByUserId as jest.Mock).mockResolvedValueOnce({ data: mockCartItems });

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.fetchCartItemsByUserId('u1');
    });

    expect(cartApis.getCartItemsByUserId).toHaveBeenCalledWith('u1');
    expect(res).toEqual(mockCartItems);
    expect(result.current.loading).toBe(false);
  });

  it('addCartItem should call createCartItem and return cart item', async () => {
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
    (cartApis.createCartItem as jest.Mock).mockResolvedValueOnce({ data: mockCartItem });

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.addCartItem(req);
    });

    expect(cartApis.createCartItem).toHaveBeenCalledWith(req);
    expect(res).toEqual(mockCartItem);
    expect(result.current.loading).toBe(false);
  });

  it('addCartItem should return null on error', async () => {
    (cartApis.createCartItem as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.addCartItem({ quantity: 1, userId: 'u1', itemId: 'i1' });
    });

    expect(res).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('modifyCartItem should call updateCartItem and return cart item', async () => {
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
    (cartApis.updateCartItem as jest.Mock).mockResolvedValueOnce({ data: mockCartItem });

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.modifyCartItem('1', req);
    });

    expect(cartApis.updateCartItem).toHaveBeenCalledWith('1', req);
    expect(res).toEqual(mockCartItem);
  });

  it('modifyCartItem should return null on error', async () => {
    (cartApis.updateCartItem as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.modifyCartItem('1', { quantity: 2 });
    });

    expect(res).toBeNull();
  });

  it('removeCartItem should call deleteCartItem and return true', async () => {
    (cartApis.deleteCartItem as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.removeCartItem('1');
    });

    expect(cartApis.deleteCartItem).toHaveBeenCalledWith('1');
    expect(res).toBe(true);
  });

  it('removeCartItem should return false on error', async () => {
    (cartApis.deleteCartItem as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.removeCartItem('1');
    });

    expect(res).toBe(false);
  });

  it('removeCartItemByUserAndItem should call deleteCartItemByUserIdAndItemId and return true', async () => {
    (cartApis.deleteCartItemByUserIdAndItemId as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.removeCartItemByUserAndItem('u1', 'i1');
    });

    expect(cartApis.deleteCartItemByUserIdAndItemId).toHaveBeenCalledWith('u1', 'i1');
    expect(res).toBe(true);
    expect(result.current.loading).toBe(false);
  });

  it('removeCartItemByUserAndItem should return false on error', async () => {
    (cartApis.deleteCartItemByUserIdAndItemId as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart());
    let res: any;
    await act(async () => {
      res = await result.current.removeCartItemByUserAndItem('u1', 'i1');
    });

    expect(res).toBe(false);
    expect(result.current.loading).toBe(false);
  });
});