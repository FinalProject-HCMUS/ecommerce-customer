import { renderHook, act } from '@testing-library/react';
import { useVNPayPayment } from '../vn-pay-checkout';
import * as orderApis from '../../services/apis/orderApis';

jest.mock('../../services/apis/orderApis', () => ({
  createVNPayPayment: jest.fn(),
}));

describe('useVNPayPayment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const checkoutData = {
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123456789',
    address: '123 Main St',
    paymentMethod: 'VNPAY',
    orderDetails: [{ itemId: 'item1', quantity: 2 }],
  };

  it('createPayment should call createVNPayPayment, set paymentUrl, and not redirect if redirectImmediately is false', async () => {
    (orderApis.createVNPayPayment as jest.Mock).mockResolvedValueOnce('https://pay.vn/redirect');

    const { result } = renderHook(() => useVNPayPayment());
    let url: string | null = null;
    await act(async () => {
      url = await result.current.createPayment(checkoutData, false);
    });

    expect(orderApis.createVNPayPayment).toHaveBeenCalledWith(checkoutData);
    expect(result.current.paymentUrl).toBe('https://pay.vn/redirect');
    expect(url).toBe('https://pay.vn/redirect');
    expect(result.current.loading).toBe(false);
  });

});