import { Role } from './Role';

export interface UserResponse {
  /**
   * Unique identifier of the user
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Email of the user
   * @example "user@example.com"
   */
  email: string;

  /**
   * Phone number of the user
   * @example "1234567890"
   */
  phoneNum: string;

  /**
   * First name of the user
   * @example "John"
   */
  firstName: string;

  /**
   * Last name of the user
   * @example "Doe"
   */
  lastName: string;

  /**
   * Address of the user
   * @example "123 Main St, City, Country"
   */
  address?: string;

  /**
   * Weight of the user in kilograms
   * @example 70
   */
  weight?: number;

  /**
   * Height of the user in centimeters
   * @example 175
   */
  height?: number;

  /**
   * Whether the user account is enabled
   * @example true
   */
  enabled: boolean;

  /**
   * Photo URL of the user
   * @example "https://example.com/photo.jpg"
   */
  photo?: string;

  /**
   * Role of the user
   * @example "USER"
   */
  role: Role;

  /**
   * Date and time when the user was created
   */
  createdAt: string;

  /**
   * Date and time when the user was last updated
   */
  updatedAt: string;

  /**
   * User who created this user
   * @example "admin"
   */
  createdBy: string;

  /**
   * User who last updated this user
   * @example "admin"
   */
  updatedBy: string;
}