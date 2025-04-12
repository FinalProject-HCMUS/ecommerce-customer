export interface ProductResponse {
  /**
   * Unique identifier of the product
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Name of the product
   * @example "iPhone 12"
   */
  name: string;

  /**
   * Description of the product
   * @example "The latest iPhone model"
   */
  description: string;

  /**
   * Cost of the product
   * @example 800
   */
  cost: number;

  /**
   * Total quantity of the product
   * @example 100
   */
  total: number;

  /**
   * Price of the product
   * @example 1000
   */
  price: number;

  /**
   * Discount percentage of the product
   * @example 0.1 // 10%
   */
  discountPercent: number;

  /**
   * Whether the product is enabled
   * @example true
   */
  enable: boolean;

  /**
   * Whether the product is in stock
   * @example true
   */
  inStock: boolean;

  /**
   * URL of the main image of the product
   * @example "https://example.com/image.jpg"
   */
  mainImageUrl: string;

  /**
   * Average rating of the product
   * @example 4.5
   */
  averageRating: number;

  /**
   * Number of reviews of the product
   * @example 100
   */
  reviewCount: number;

  /**
   * ID of the category this product belongs to
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  categoryId: string;

  /**
   * Date and time when the product was created
   */
  createdAt: string;

  /**
   * Date and time when the product was last updated
   */
  updatedAt: string;

  /**
   * User who created the product
   * @example "admin"
   */
  createdBy: string;

  /**
   * User who last updated the product
   * @example "admin"
   */
  updatedBy: string;
}
