export interface ChangePasswordRequest {
  /**
   * Current password of the user
   * @example "currentpassword123"
   */
  currentPassword: string;

  /**
   * New password of the user
   * @example "newpassword123"
   */
  newPassword: string;

  /**
   * Confirm new password
   * @example "newpassword123"
   */
  confirmPassword: string;
}