import { OrderDetailResponse } from '../order/OrderDetailResponse';
import { ColorResponse } from '../product/ColorResponse';
import { SizeResponse } from '../product/SizeResponse';

export interface ReviewResponse {
  id: string;
  comment: string;
  headline: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  orderDetailId: string;
  userName: string;
  orderDetail?: OrderDetailResponse;
  color?: ColorResponse;
  size?: SizeResponse;
}
