import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import { t } from '../../../helpers/i18n';
import { useReviews } from '../../../hooks/reviews';
import { ReviewResponse } from '../../../interfaces/review/ReviewResponse';

interface ReviewSectionProps {
  productId?: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const {
    reviews: fetchedReviews,
    pageable,
    loading,
    error,
    fetchReviews,
  } = useReviews();
  const [currentPage, setCurrentPage] = useState(0);
  const [combinedReviews, setCombinedReviews] = useState<ReviewResponse[]>([]);
  const pageSize = 5;

  // Initial load of reviews
  useEffect(() => {
    // Reset combined reviews when productId changes
    setCombinedReviews([]);
    setCurrentPage(0);

    fetchReviews(
      0, // Always start from page 0 when product changes
      pageSize,
      ['createdAt,desc'],
      undefined,
      undefined,
      undefined,
      undefined,
      productId
    );
  }, [productId]);

  // Update combined reviews when new reviews are fetched
  useEffect(() => {
    if (fetchedReviews && fetchedReviews.length > 0) {
      if (currentPage === 0) {
        // Replace all reviews if we're on the first page
        setCombinedReviews(fetchedReviews);
      } else {
        // Append to existing reviews for subsequent pages
        setCombinedReviews((prev) => {
          // Create a Set of existing IDs to avoid duplicates
          const existingIds = new Set(prev.map((review) => review.id));
          // Only add reviews that don't already exist
          const newReviews = fetchedReviews.filter(
            (review) => !existingIds.has(review.id)
          );
          return [...prev, ...newReviews];
        });
      }
    }
  }, [fetchedReviews, currentPage]);

  const handleLoadMore = () => {
    if (pageable && currentPage < pageable.totalPages - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      fetchReviews(
        nextPage,
        pageSize,
        ['createdAt,desc'],
        undefined,
        undefined,
        undefined,
        undefined,
        productId
      );
    }
  };

  if (loading && currentPage === 0) {
    return (
      <div className="flex justify-center items-center mb-8">
        <div className="loader">{t('lbl.loading')}</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          {t('lbl.allReviews')}{' '}
          <span className="text-gray-500 font-normal">
            ({pageable?.totalElements || 0})
          </span>
        </h2>
      </div>

      {combinedReviews && combinedReviews.length > 0 ? (
        <>
          {combinedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              author={review.userName}
              isVerified={true}
              rating={review.rating}
              content={review.comment}
              date={review.createdAt}
            />
          ))}

          {pageable && currentPage < pageable.totalPages - 1 && (
            <button
              className="w-full py-3 border border-gray-300 rounded-[12px] text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? t('btn.loading') : t('btn.loadMoreReviews')}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center py-6">
          {t('lbl.noReviewsYet')}
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
