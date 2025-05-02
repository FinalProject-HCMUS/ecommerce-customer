import { RoleChat } from './RoleChat'
export interface MessageResponse {
  id: string
  content: string
  roleChat: RoleChat
  customerId: string
  adminId: string
  createdAt: string
  createdBy: string
  updatedAt: string
  updatedBy: string
}
