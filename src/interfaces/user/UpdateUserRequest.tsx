export interface UpdateUserRequest {
  phoneNumber: string
  firstName: string
  lastName: string
  address?: string
  weight: number
  height: number
  photo?: string
}
