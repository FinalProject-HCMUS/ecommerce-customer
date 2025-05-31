import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { OrderResponse } from '../../interfaces/order/OrderResponse';
import { CheckoutRequest } from '../../interfaces/order/CheckOut';

const API_BASE_URL = '/orders';

export const checkout = async (checkoutData: CheckoutRequest): Promise<CustomResponse<OrderResponse>> => {
  const response = await client.post<CustomResponse<OrderResponse>>(`${API_BASE_URL}/checkout`, checkoutData);
  return response.data;
};