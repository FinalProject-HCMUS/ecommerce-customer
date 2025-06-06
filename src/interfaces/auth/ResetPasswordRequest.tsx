export interface ResetPasswordRequest {
  newPassword: string;
  confirmPassword: string;
  token: string;
}
