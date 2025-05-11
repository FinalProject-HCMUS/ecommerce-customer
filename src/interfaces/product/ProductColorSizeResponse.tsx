import { ProductResponse } from './ProductResponse';
import { ColorResponse } from './ColorResponse';
import { SizeResponse } from './SizeResponse';

export interface ProductColorSizeResponse {
  id: string;
  quantity: number;
  product: ProductResponse;
  color: ColorResponse;
  size: SizeResponse;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
