import client from './request';
import { CustomResponse } from '../../interfaces/common/CustomResponse';
import { Pageable, ReviewResponse } from '../../interfaces';
import { CreateReviewRequest } from '../../interfaces/review/CreateReviewRequest';

export const getAllReviews = async (
  page: number = 0,
  size: number = 10,
  sort?: string[],
  keyword?: string,
  minRating?: number,
  maxRating?: number,
  orderDetailId?: string,
  productId?: string
): Promise<CustomResponse<Pageable<ReviewResponse[]>>> => {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  if (sort && sort.length) {
    sort.forEach((sortItem) => params.append('sort', sortItem));
  }
  if (keyword) params.append('keyword', keyword);
  if (minRating) params.append('minRating', minRating.toString());
  if (maxRating) params.append('maxRating', maxRating.toString());
  if (orderDetailId) params.append('orderDetailId', orderDetailId);
  if (productId) params.append('productId', productId);

  const response = await client.get<CustomResponse<Pageable<ReviewResponse[]>>>(
    `/reviews?${params.toString()}`
  );
  return response.data;
};

export const createReview = async (
  request: CreateReviewRequest
): Promise<CustomResponse<ReviewResponse>> => {
  const response = await client.post<CustomResponse<ReviewResponse>>(
    '/reviews',
    request
  );
  return response.data;
};
