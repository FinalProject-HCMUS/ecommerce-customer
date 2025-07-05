import { renderHook, act } from '@testing-library/react';
import * as orderApis from '../../services/apis/orderApis';
import { useCheckout, useOrderSearch } from '../order';

jest.mock('../../services/apis/orderApis', () => ({
  checkout: jest.fn(),
  searchOrders: jest.fn(),
}));

describe('useCheckout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('performCheckout should call checkout and set orderResponse on success', async () => {
    const mockOrder = { id: 'o1', firstName: 'John', lastName: 'Doe' };
    const mockResponse = {
      timestamp: '',
      httpStatus: 'OK',
      isSuccess: true,
      data: mockOrder,
    };
    (orderApis.checkout as jest.Mock).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCheckout());
    let res: any;
    await act(async () => {
      res = await result.current.performCheckout({ firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'A', paymentMethod: 'COD', orderDetails: [] });
    });

    expect(orderApis.checkout).toHaveBeenCalled();
    expect(result.current.orderResponse).toEqual(mockOrder);
    expect(res).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
  });

  it('performCheckout should return undefined and not set orderResponse on error', async () => {
    (orderApis.checkout as jest.Mock).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCheckout());
    let res: any;
    await act(async () => {
      res = await result.current.performCheckout({ firstName: 'John', lastName: 'Doe', phoneNumber: '123', address: 'A', paymentMethod: 'COD', orderDetails: [] });
    });

    expect(res).toBeUndefined();
    expect(result.current.orderResponse).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});

describe('useOrderSearch', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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
    content: [
      {
        id: 'o1',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123',
        status: 'NEW',
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
      },
    ],
    number: 0,
    sort: { sorted: false, unsorted: true, empty: true },
    empty: false,
  };



  it('setSearchParams should update searchParams and reset page if filter changes', async () => {
    (orderApis.searchOrders as jest.Mock).mockResolvedValue({
      isSuccess: true,
      data: mockPageable,
    });

    const { result } = renderHook(() => useOrderSearch({ page: 2, size: 10 }));
    await act(async () => {
      result.current.setSearchParams({ keyword: 'test' });
    });

    expect(result.current.searchParams.page).toBe(0);
    expect(result.current.searchParams.keyword).toBe('test');
  });

  it('setSearchParams should update searchParams and keep page if not filter', async () => {
    (orderApis.searchOrders as jest.Mock).mockResolvedValue({
      isSuccess: true,
      data: mockPageable,
    });

    const { result } = renderHook(() => useOrderSearch({ page: 2, size: 10 }));
    await act(async () => {
      result.current.setSearchParams({ page: 3 });
    });

    expect(result.current.searchParams.page).toBe(3);
  });
});