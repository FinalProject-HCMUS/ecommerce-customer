import { useState } from 'react';
import { checkout } from '../services/apis/orderApis';
import { CheckoutRequest } from '../interfaces/order/CheckOut';
import { OrderResponse } from '../interfaces/order/OrderResponse';
import { CustomResponse } from '../interfaces/common/CustomResponse';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);

  const performCheckout = async (checkoutData: CheckoutRequest): Promise<CustomResponse<OrderResponse> | undefined> => {
    setLoading(true);
    try {
      const response = await checkout(checkoutData);
      
      if (response.isSuccess && response.data) {
        setOrderResponse(response.data);
      }
      
      setLoading(false);
      return response;
    } catch {
      setLoading(false);
      return undefined;
    }
  };

  return {
    loading,
    orderResponse,
    performCheckout
  };
};