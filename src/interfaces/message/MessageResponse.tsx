export interface MessageResponse {
  /**
   * Unique identifier of the message
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  id: string;

  /**
   * Content of the message
   * @example "Hello, how can I help you?"
   */
  content: string;

  /**
   * Role of the message sender
   * @example "ADMIN"
   */
  roleChat: RoleChat;

  /**
   * ID of the customer
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  customerId: string;

  /**
   * ID of the admin
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  adminId: string;

  /**
   * Date and time when the message was created
   */
  createdAt: string;

  /**
   * User who created the message
   * @example "admin"
   */
  createdBy: string;

  /**
   * Date and time when the message was last updated
   */
  updatedAt: string;

  /**
   * User who last updated the message
   * @example "admin"
   */
  updatedBy: string;
}

/**
 * Enum for the role of the message sender
 */
export enum RoleChat {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}