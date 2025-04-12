export interface ProductColorSizeResponse {
  /**
   * Quantity of the product_color_size
   * @example 10
   */
  quantity: number;

  /**
   * ID of the product
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  productId: string;

  /**
   * ID of the color
   * @example "456e7890-b12c-34d5-e678-123456789abc"
   */
  colorId: string;

  /**
   * ID of the size
   * @example "789e0123-c45d-67f8-9012-3456789abcde"
   */
  sizeId: string;

  /**
   * Date and time when the product_color_size was created
   */
  createdAt: string;

  /**
   * User who created the product_color_size
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the product_color_size was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the product_color_size
   * @example "admin"
   */
  updatedBy: string;
}
