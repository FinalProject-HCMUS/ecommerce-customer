export interface SizeResponse {
  /**
   * Unique identifier of the size
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Name of the size
   * @example "M"
   */
  name: string;

  /**
   * Minimum height for this size in cm
   * @example 150
   */
  minHeight: number;

  /**
   * Maximum height for this size in cm
   * @example 180
   */
  maxHeight: number;

  /**
   * Minimum weight for this size in kg
   * @example 50
   */
  minWeight: number;

  /**
   * Maximum weight for this size in kg
   * @example 80
   */
  maxWeight: number;

  /**
   * Date and time when the size was created
   */
  createdAt: string;

  /**
   * User who created the size
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the size was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the size
   * @example "admin"
   */
  updatedBy: string;
}