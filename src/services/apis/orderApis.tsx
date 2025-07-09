import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { OrderResponse } from '../../interfaces/order/OrderResponse';
import { CheckoutRequest } from '../../interfaces/order/CheckOut';
import { Pageable, Status } from '../../interfaces';

const API_BASE_URL = '/orders';

export const checkout = async (
  checkoutData: CheckoutRequest
): Promise<CustomResponse<OrderResponse>> => {
  const response = await client.post<CustomResponse<OrderResponse>>(
    `${API_BASE_URL}/checkout`,
    checkoutData
  );
  return response.data;
};

export const createVNPayPayment = async (
  checkoutData: CheckoutRequest
): Promise<string> => {
  const response = await client.post<string>(
    '/vn-payment/create',
    checkoutData
  );
  return response.data;
};

export const searchOrders = async (params: {
  keyword?: string;
  status?: Status;
  page?: number;
  size?: number;
  sort?: string[];
}): Promise<CustomResponse<Pageable<OrderResponse[]>>> => {
  const { keyword, status, page = 0, size = 10, sort } = params;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (keyword) queryParams.append('keyword', keyword);
  if (status) queryParams.append('status', status);
  queryParams.append('page', page.toString());
  queryParams.append('size', size.toString());

  if (sort && sort.length > 0) {
    sort.forEach((sortParam) => {
      queryParams.append('sort', sortParam);
    });
  }

  const response = await client.get<CustomResponse<Pageable<OrderResponse[]>>>(
    `${API_BASE_URL}/search?${queryParams.toString()}`
  );

  return response.data;
};

export const retryVNPayPayment = async (orderId: string): Promise<string> => {
  const response = await client.post<string>(`/vn-payment/retry/${orderId}`);
  return response.data;
};
