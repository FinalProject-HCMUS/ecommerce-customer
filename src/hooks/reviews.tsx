import { useState } from 'react';
import { getAllReviews } from '../services/apis/reviewApis';
import { Pageable, ReviewResponse } from '../interfaces';

interface ReviewsState {
  data?: ReviewResponse[];
  pageable: Pageable<ReviewResponse[]> | null;
  loading: boolean;
  error: string | null;
}

export const useReviews = () => {
  const [state, setState] = useState<ReviewsState>({
    data: [],
    pageable: null,
    loading: false,
    error: null,
  });

  /**
   * Fetch reviews with optional filters and pagination
   */
  const fetchReviews = async (
    page: number = 0,
    size: number = 10,
    sort?: string[],
    keyword?: string,
    minRating?: number,
    maxRating?: number,
    orderDetailId?: string,
    productId?: string
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await getAllReviews(
        page,
        size,
        sort,
        keyword,
        minRating,
        maxRating,
        orderDetailId,
        productId
      );

      if (response.isSuccess) {
        setState({
          data: response?.data?.content,
          pageable: response.data ?? null,
          loading: false,
          error: null,
        });
        return response.data;
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch reviews',
        }));
        return null;
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      }));
      return null;
    }
  };

  return {
    reviews: state.data,
    pageable: state.pageable,
    loading: state.loading,
    error: state.error,
    fetchReviews,
  };
};
