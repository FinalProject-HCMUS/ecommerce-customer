export interface ProductImageResponse {
  /**
   * Unique identifier of the product image
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * URL of the product image
   * @example "https://example.com/image.jpg"
   */
  url: string;

  /**
   * ID of the product associated with the image
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  productId: string;

  /**
   * Date and time when the product image was created
   */
  createdAt: string;

  /**
   * User who created the product image
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the product image was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the product image
   * @example "admin"
   */
  updatedBy: string;
}