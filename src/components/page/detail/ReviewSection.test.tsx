import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewSection from './ReviewSection';

// Mock t function
jest.mock('../../../helpers/i18n', () => ({
  t: (key: string) => key,
}));

// Mock ReviewCard
jest.mock('./ReviewCard', () => (props: any) => (
  <div data-testid="review-card">{props.author}</div>
));

// Mock useReviews hook
const mockFetchReviews = jest.fn();
const mockUseReviews = ({
  reviews = [],
  pageable = { totalElements: 0, totalPages: 1 },
  loading = false,
  error = null,
}: {
  reviews?: ReviewResponse[];
  pageable?: { totalElements: number; totalPages: number };
  loading?: boolean;
  error?: any;
} = {}) => ({
  reviews,
  pageable,
  loading,
  error,
  fetchReviews: mockFetchReviews,
});
jest.mock('../../../hooks/reviews', () => ({
  useReviews: jest.fn(),
}));

import { useReviews } from '../../../hooks/reviews';
import { ReviewResponse } from '../../../interfaces';

const mockReviews: ReviewResponse[] = [
  {
    id: 'r1',
    userName: 'Alice',
    rating: 5,
    comment: 'Great!',
    createdAt: '2024-07-01',
    headline: '',
    updatedAt: '',
    orderDetailId: '',
  },
  {
    id: 'r2',
    userName: 'Bob',
    rating: 4,
    comment: 'Good!',
    createdAt: '2024-07-02',
    headline: '',
    updatedAt: '',
    orderDetailId: '',
  },
];

describe('ReviewSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useReviews as jest.Mock).mockImplementation(() =>
      mockUseReviews({ loading: true })
    );
    render(<ReviewSection productId="p1" />);
    expect(screen.getByText('lbl.loading')).toBeInTheDocument();
  });

  it('renders no reviews message', () => {
    (useReviews as jest.Mock).mockImplementation(() =>
      mockUseReviews({ reviews: [] })
    );
    render(<ReviewSection productId="p1" />);
    expect(screen.getByText('lbl.noReviewsYet')).toBeInTheDocument();
  });

  it('renders reviews and total count', () => {
    (useReviews as jest.Mock).mockImplementation(() =>
      mockUseReviews({
        reviews: mockReviews,
        pageable: { totalElements: 2, totalPages: 1 },
      })
    );
    render(<ReviewSection productId="p1" />);
    expect(screen.getByText('lbl.allReviews')).toBeInTheDocument();
    expect(screen.getByText('(2)')).toBeInTheDocument();
    expect(screen.getAllByTestId('review-card')).toHaveLength(2);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('calls fetchReviews on mount and when productId changes', () => {
    (useReviews as jest.Mock).mockImplementation(() => mockUseReviews());
    const { rerender } = render(<ReviewSection productId="p1" />);
    expect(mockFetchReviews).toHaveBeenCalledWith(
      0,
      5,
      ['createdAt,desc'],
      undefined,
      undefined,
      undefined,
      undefined,
      'p1'
    );
    rerender(<ReviewSection productId="p2" />);
    expect(mockFetchReviews).toHaveBeenCalledWith(
      0,
      5,
      ['createdAt,desc'],
      undefined,
      undefined,
      undefined,
      undefined,
      'p2'
    );
  });

  it('loads more reviews when Load More button is clicked', async () => {
    (useReviews as jest.Mock).mockImplementation(() =>
      mockUseReviews({
        reviews: mockReviews,
        pageable: { totalElements: 10, totalPages: 2 },
        loading: false,
      })
    );
    render(<ReviewSection productId="p1" />);
    const loadMoreBtn = screen.getByRole('button', {
      name: 'btn.loadMoreReviews',
    });
    fireEvent.click(loadMoreBtn);
    await waitFor(() => {
      expect(mockFetchReviews).toHaveBeenCalledWith(
        1,
        5,
        ['createdAt,desc'],
        undefined,
        undefined,
        undefined,
        undefined,
        'p1'
      );
    });
  });
});
