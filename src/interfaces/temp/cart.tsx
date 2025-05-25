export interface CartItemType {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
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
}
