export interface CartItemResponse {
  /**
   * Unique identifier of the cart item
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string

  /**
   * Quantity of the product
   * @example 2
   */
  quantity: number

  /**
   * ID of the user
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  userId: string

  /**
   * ID of the item - product color size
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  itemId: string
}
