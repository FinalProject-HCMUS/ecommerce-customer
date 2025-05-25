import client from './request';
import { MessageResponse } from '../../interfaces/message/MessageResponse';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { Pageable } from '../../interfaces/common/Pageable';

export const getMessagesByConversationIdPaginated = async (
  conversationId: string,
  page: number = 0,
  size: number = 10,
  sort?: string[]
): Promise<CustomResponse<Pageable<MessageResponse[]>>> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  if (sort && sort.length) {
    sort.forEach((sortParam) => params.append('sort', sortParam));
  }

  const response = await client.get<CustomResponse<Pageable<MessageResponse[]>>>(
    `/messages/conversation/${conversationId}/paginated?${params.toString()}`
  );
  
  return response.data;
};
