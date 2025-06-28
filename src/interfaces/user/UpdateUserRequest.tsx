export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: string;
  height?: number;
  weight?: number;
  photo?: string | null; // Add this line for the photo URL
}
