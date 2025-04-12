export interface CategoryResponse {
  /**
   * Unique identifier of the category
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Name of the category
   * @example "Electronics"
   */
  name: string;

  /**
   * Description of the category
   * @example "Electronic devices and gadgets"
   */
  description: string;

  /**
   * Date and time when the category was created
   */
  createdAt: string;

  /**
   * User who created the category
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the category was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the category
   * @example "admin"
   */
  updatedBy: string;
}