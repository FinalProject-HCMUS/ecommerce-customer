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
  isPaid: boolean;
}

export interface OrderSummaryData {
  subtotal: number;
  deliveryFee: number;
  total: number;
  selectedItemCount?: number;
  totalItemCount?: number;
}

export interface QuantityControlProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
}

export interface OrderSummaryProps {
  data: OrderSummaryData;
  isCheckoutEnabled?: boolean;
  onCheckout?: () => void;
}
