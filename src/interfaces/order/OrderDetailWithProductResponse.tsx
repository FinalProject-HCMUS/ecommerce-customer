import { ProductResponse } from '../product/ProductResponse';
import { ColorResponse } from '../product/ColorResponse';
import { SizeResponse } from '../product/SizeResponse';

export interface OrderDetailWithProductResponse {
  productCost: number;
  quantity: number;
  unitPrice: number;
  total: number;
  product: ProductResponse;
  orderId: string;
  itemId: string;
  id: string;
  color: ColorResponse;
  size: SizeResponse;
  limitedQuantity: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}