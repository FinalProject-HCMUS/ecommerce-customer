export interface ColorResponse {
  /**
   * Unique identifier of the color
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Name of the color
   * @example "Red"
   */
  name: string;

  /**
   * Date and time when the color was created
   */
  createdAt: string;

  /**
   * User who created the color
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the color was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the color
   * @example "admin"
   */
  updatedBy: string;
}
