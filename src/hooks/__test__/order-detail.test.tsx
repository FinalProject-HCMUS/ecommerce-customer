import { renderHook, act } from '@testing-library/react';
import * as detailOrderApis from '../../services/apis/detailOrderApis';
import { useOrderDetails } from '../order-detail';

jest.mock('../../services/apis/detailOrderApis', () => ({
  getOrderDetailsByOrderId: jest.fn(),
}));

describe('useOrderDetails', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockOrderDetails = [
    {
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
    },
  ];

  it('fetchOrderDetails should call API and update orderDetails state', async () => {
    (
      detailOrderApis.getOrderDetailsByOrderId as jest.Mock
    ).mockResolvedValueOnce({
      isSuccess: true,
      data: mockOrderDetails,
    });

    const { result } = renderHook(() => useOrderDetails('o1'));
    await act(async () => {
      await result.current.fetchOrderDetails();
    });

    expect(detailOrderApis.getOrderDetailsByOrderId).toHaveBeenCalledWith('o1');
    expect(result.current.orderDetails).toEqual(mockOrderDetails);
    expect(result.current.loading).toBe(false);
  });

  it('fetchOrderDetails should use id argument if provided', async () => {
    (
      detailOrderApis.getOrderDetailsByOrderId as jest.Mock
    ).mockResolvedValueOnce({
      isSuccess: true,
      data: mockOrderDetails,
    });

    const { result } = renderHook(() => useOrderDetails());
    await act(async () => {
      await result.current.fetchOrderDetails('o1');
    });

    expect(detailOrderApis.getOrderDetailsByOrderId).toHaveBeenCalledWith('o1');
    expect(result.current.orderDetails).toEqual(mockOrderDetails);
    expect(result.current.loading).toBe(false);
  });

  it('fetchOrderDetails should not call API if no orderId', async () => {
    const { result } = renderHook(() => useOrderDetails());
    await act(async () => {
      await result.current.fetchOrderDetails();
    });

    expect(detailOrderApis.getOrderDetailsByOrderId).not.toHaveBeenCalled();
    expect(result.current.orderDetails).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('fetchOrderDetails should set loading false and not update orderDetails on error', async () => {
    (
      detailOrderApis.getOrderDetailsByOrderId as jest.Mock
    ).mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useOrderDetails('o1'));
    await act(async () => {
      await result.current.fetchOrderDetails();
    });

    expect(result.current.orderDetails).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('setOrderId should update orderId and trigger fetchOrderDetails', async () => {
    (detailOrderApis.getOrderDetailsByOrderId as jest.Mock).mockResolvedValue({
      isSuccess: true,
      data: mockOrderDetails,
    });

    const { result } = renderHook(() => useOrderDetails());
    await act(async () => {
      result.current.setOrderId('o1');
    });

    // Wait for useEffect to trigger fetchOrderDetails
    await act(async () => {
      // Wait for the next tick
      await Promise.resolve();
    });

    expect(detailOrderApis.getOrderDetailsByOrderId).toHaveBeenCalledWith('o1');
    expect(result.current.orderDetails).toEqual(mockOrderDetails);
  });
});
