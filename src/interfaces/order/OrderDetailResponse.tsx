export interface OrderDetailResponse {
  /**
   * Cost of the product
   * @example 100.0
   */
  productCost: number;

  /**
   * Quantity of the product
   * @example 2
   */
  quantity: number;

  /**
   * Unit price of the product
   * @example 50.0
   */
  unitPrice: number;

  /**
   * Total cost of the order detail
   * @example 100.0
   */
  total: number;

  /**
   * ID of the product
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  productId: string;

  /**
   * ID of the order
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  orderId: string;

  /**
   * Date and time when the order detail was created
   */
  createdAt: string;

  /**
   * User who created the order detail
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the order detail was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the order detail
   * @example "admin"
   */
  updatedBy: string;
}
