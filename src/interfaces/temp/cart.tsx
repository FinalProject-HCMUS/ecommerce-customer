export interface CartItemType {
  id: number
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}

export interface OrderSummaryData {
  subtotal: number
  discountRate: number
  discountAmount: number
  deliveryFee: number
  total: number
}

export interface CartItemProps {
  item: CartItemType
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
}

export interface QuantityControlProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
}

export interface OrderSummaryProps {
  data: OrderSummaryData
}
