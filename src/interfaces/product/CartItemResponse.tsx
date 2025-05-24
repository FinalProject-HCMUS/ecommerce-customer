import { ProductResponse } from './ProductResponse';

export interface CartItemResponse {
  id: string;
  quantity: number;
  product: ProductResponse;
  color: string;
  size: string;
  userId: string;
  itemId: string;
}
