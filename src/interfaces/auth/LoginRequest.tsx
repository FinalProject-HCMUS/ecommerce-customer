export interface LoginRequest {
  /**
   * Email of the user
   * @example "user@example.com"
   */
  email: string;

  /**
   * Password of the user
   * @example "password123"
   */
  password: string;
}
