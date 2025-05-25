import client from './request';
import { ConversationResponse } from '../../interfaces/message/ConversationResponse';
import { CustomResponse } from '../../interfaces/common/CustomResponse';

export const getConversationsByCustomerId = async (
  customerId: string
): Promise<CustomResponse<ConversationResponse[]>> => {
  const response = await client.get<CustomResponse<ConversationResponse[]>>(`/conversations/customer/${customerId}`);
  return response.data;
};