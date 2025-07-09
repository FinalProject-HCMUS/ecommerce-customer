import { renderHook, act } from '@testing-library/react';
import * as reviewApis from '../../services/apis/reviewApis';
import { useReviews, useCreateReview } from '../reviews';

jest.mock('../../services/apis/reviewApis', () => ({
  getAllReviews: jest.fn(),
  createReview: jest.fn(),
}));

describe('useReviews', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetchReviews should call getAllReviews and update state on success', async () => {
    const mockPageable = {
      totalElements: 1,
      totalPages: 1,
      last: true,
      first: true,
      pageable: {
        paged: true,
        pageNumber: 0,
        pageSize: 10,
        unpaged: false,
        offset: 0,
        sort: { sorted: false, unsorted: true, empty: true },
      },
      numberOfElements: 1,
      size: 10,
      content: [
        {
          id: 'r1',
          comment: 'Great!',
          headline: 'Awesome',
          rating: 5,
          createdAt: '2023-01-01',
          updatedAt: '2023-01-02',
          orderDetailId: 'od1',
          userName: 'John',
        },
      ],
      number: 0,
      sort: { sorted: false, unsorted: true, empty: true },
      empty: false,
    };
    (reviewApis.getAllReviews as jest.Mock).mockResolvedValueOnce({
      isSuccess: true,
      data: mockPageable,
    });

    const { result } = renderHook(() => useReviews());
    let res: any;
    await act(async () => {
      res = await result.current.fetchReviews(
        0,
        10,
        ['createdAt,desc'],
        'search',
        4,
        5,
        'od1',
        'p1'
      );
    });

    expect(reviewApis.getAllReviews).toHaveBeenCalledWith(
      0,
      10,
      ['createdAt,desc'],
      'search',
      4,
      5,
      'od1',
      'p1'
    );
    expect(result.current.reviews).toEqual(mockPageable.content);
    expect(result.current.pageable).toEqual(mockPageable);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(res).toEqual(mockPageable);
  });

  it('fetchReviews should set error if not success', async () => {
    (reviewApis.getAllReviews as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
      data: null,
    });

    const { result } = renderHook(() => useReviews());
    let res: any;
    await act(async () => {
      res = await result.current.fetchReviews();
    });

    expect(result.current.error).toBe('Failed to fetch reviews');
    expect(result.current.loading).toBe(false);
    expect(res).toBeNull();
  });

  it('fetchReviews should set error on exception', async () => {
    (reviewApis.getAllReviews as jest.Mock).mockRejectedValueOnce(
      new Error('fail')
    );

    const { result } = renderHook(() => useReviews());
    let res: any;
    await act(async () => {
      res = await result.current.fetchReviews();
    });

    expect(result.current.error).toBe('fail');
    expect(result.current.loading).toBe(false);
    expect(res).toBeNull();
  });
});

describe('useCreateReview', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submitReview should call createReview and update state on success', async () => {
    const mockReview = {
      id: 'r1',
      comment: 'Nice!',
      headline: 'Good',
      rating: 5,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      orderDetailId: 'od1',
      userName: 'Jane',
    };
    (reviewApis.createReview as jest.Mock).mockResolvedValueOnce({
      isSuccess: true,
      data: mockReview,
    });

    const { result } = renderHook(() => useCreateReview());
    let res: any;
    await act(async () => {
      res = await result.current.submitReview({
        comment: 'Nice!',
        headline: 'Good',
        rating: 5,
        orderDetailId: 'od1',
        userName: 'Jane',
      });
    });

    expect(reviewApis.createReview).toHaveBeenCalledWith({
      comment: 'Nice!',
      headline: 'Good',
      rating: 5,
      orderDetailId: 'od1',
      userName: 'Jane',
    });
    expect(result.current.success).toBe(true);
    expect(result.current.createdReview).toEqual(mockReview);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(res).toEqual(mockReview);
  });

  it('submitReview should set error if not success', async () => {
    (reviewApis.createReview as jest.Mock).mockResolvedValueOnce({
      isSuccess: false,
      data: null,
    });

    const { result } = renderHook(() => useCreateReview());
    let res: any;
    await act(async () => {
      res = await result.current.submitReview({
        comment: 'Bad',
        headline: 'Bad',
        rating: 1,
        orderDetailId: 'od2',
        userName: 'Tom',
      });
    });

    expect(result.current.success).toBe(false);
    expect(result.current.createdReview).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Failed to submit review');
    expect(res).toBeNull();
  });

  it('submitReview should set error on exception', async () => {
    (reviewApis.createReview as jest.Mock).mockRejectedValueOnce(
      new Error('fail')
    );

    const { result } = renderHook(() => useCreateReview());
    let res: any;
    await act(async () => {
      res = await result.current.submitReview({
        comment: 'Bad',
        headline: 'Bad',
        rating: 1,
        orderDetailId: 'od2',
        userName: 'Tom',
      });
    });

    expect(result.current.success).toBe(false);
    expect(result.current.createdReview).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('fail');
    expect(res).toBeNull();
  });

  it('resetState should reset all state', () => {
    const { result } = renderHook(() => useCreateReview());
    act(() => {
      result.current.resetState();
    });
    expect(result.current.success).toBe(false);
    expect(result.current.createdReview).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
