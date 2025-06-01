import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { OrderDetailWithProductResponse } from '../../interfaces/order/OrderDetailWithProductResponse';

const API_BASE_URL = '/order-details';

export const getOrderDetailsByOrderId = async (orderId: string): Promise<CustomResponse<OrderDetailWithProductResponse[]>> => {
  const response = await client.get<CustomResponse<OrderDetailWithProductResponse[]>>(
    `${API_BASE_URL}/order/${orderId}`
  );
  return response.data;
};