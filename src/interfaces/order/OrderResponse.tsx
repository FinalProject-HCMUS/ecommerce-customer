import { PaymentMethod } from './PaymentMethod';
import { Status } from './Status';
import { OrderTrackResponse } from './OrderTrackResponse';

export interface OrderResponse {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: Status;
  orderDate: string;
  deliveryDate: string;
  paymentMethod: PaymentMethod;
  shippingCost: number;
  productCost: number;
  subTotal: number;
  total: number;
  customerId: string;
  orderTracks: OrderTrackResponse[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
