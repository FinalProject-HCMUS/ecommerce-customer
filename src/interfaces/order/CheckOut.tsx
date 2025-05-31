export interface OrderItemRequest {
  itemId: string;
  quantity: number;
}

export interface CheckoutRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: string;
  orderDetails: OrderItemRequest[];
}