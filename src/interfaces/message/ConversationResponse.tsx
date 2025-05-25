import { UserResponse } from '../user/UserResponse';
import { MessageResponse } from './MessageResponse';

export interface ConversationResponse {
  id: string;
  customer: UserResponse;
  isAdminRead: boolean;
  isCustomerRead: boolean;
  latestMessage: MessageResponse;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
}
