import { Role } from './Role'

export interface UserResponse {
  id: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  address?: string
  weight?: number
  height?: number
  enabled: boolean
  photo?: string
  role: Role
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}
