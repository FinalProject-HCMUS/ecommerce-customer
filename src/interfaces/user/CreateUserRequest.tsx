import { Role } from './Role';

export interface CreateUserRequest {
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
   * Password of the user
   * @example "password123"
   */
  password: string;

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
}
