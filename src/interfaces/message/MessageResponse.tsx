export interface MessageResponse {
  id: string;
  content: string;
  userId: string;
  conversationId: string;
  messageType: string;
  contentUrl?: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
  role: 'user' | 'admin';
}
