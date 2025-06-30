import type React from 'react';
import { useState } from 'react';
import { Package, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { Modal, Button, Rate, Input } from 'antd'; // Add Ant Design imports
import StatusBadge from './StatusBadge';
import { OrderResponse } from '../../../interfaces';
import { formatCurrency } from '../../../helpers/string';
import { t } from 'i18next';
import { useOrderDetails } from '../../../hooks/order-detail';
import { useCreateReview, useReviews } from '../../../hooks/reviews';
import Loading from '../../shared/Loading';
import { OrderDetailWithProductResponse } from '../../../interfaces/order/OrderDetailWithProductResponse';
import { CreateReviewRequest } from '../../../interfaces/review/CreateReviewRequest';
import { showSuccess } from '../../../utils/messageRender';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../context/settingContext';

const { TextArea } = Input;

interface OrderCardProps {
  order: OrderResponse;
  onViewStatus: (order: OrderResponse) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const { orderDetails, loading, fetchOrderDetails } = useOrderDetails();
  const { submitReview, loading: reviewSubmitting, error } = useCreateReview();
  const { fetchReviews, reviews } = useReviews();

  // States for review modal
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<OrderDetailWithProductResponse | null>(null);
  const [reviewData, setReviewData] = useState({
    comment: '',
    headline: '',
    rating: 5,
    orderDetailId: '',
    userName: '',
  });
  const [viewingReviewFor, setViewingReviewFor] = useState<string | null>(null);

  // Validation states
  const [validationErrors, setValidationErrors] = useState<{
    headline?: string;
    comment?: string;
    rating?: string;
  }>({
    headline: undefined,
    comment: undefined,
    rating: undefined,
  });

  const { settings } = useSettingsContext();
  const currencyCode = (settings.find(
    (setting) => setting.key === 'CurrencyCode'
  )?.value || 'VND') as 'USD' | 'VND';

  // Fetch order details when expanded
  const handleToggleExpand = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);

    // Fetch order details when expanding
    if (newExpandedState) {
      fetchOrderDetails(order.id);
    }
  };

  // Open review modal for a specific order detail
  const openReviewModal = (orderDetail: OrderDetailWithProductResponse) => {
    setSelectedOrderDetail(orderDetail);
    setReviewData({
      ...reviewData,
      orderDetailId: orderDetail.id,
      userName: localStorage.getItem('userName') || 'Anonymous',
    });
    setIsReviewModalOpen(true);
  };

  // Handle review submission
  const handleSubmitReview = async () => {
    if (!selectedOrderDetail) return;

    // Clear previous validation errors
    setValidationErrors({
      headline: undefined,
      comment: undefined,
      rating: undefined,
    });

    // Validate form data
    const errors: {
      headline?: string;
      comment?: string;
      rating?: string;
    } = {};

    if (!reviewData.headline || reviewData.headline.trim() === '') {
      errors.headline = t('review.errors.headlineRequired');
    } else if (reviewData.headline.length > 100) {
      errors.headline = t('review.errors.headlineTooLong');
    }

    if (!reviewData.comment || reviewData.comment.trim() === '') {
      errors.comment = t('review.errors.commentRequired');
    } else if (reviewData.comment.length > 1000) {
      errors.comment = t('review.errors.commentTooLong');
    }

    if (reviewData.rating < 1) {
      errors.rating = t('review.errors.ratingRequired');
    }

    // If there are validation errors, show them and stop submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Continue with submission if validation passes
    const review: CreateReviewRequest = {
      comment: reviewData.comment.trim(),
      headline: reviewData.headline.trim(),
      rating: reviewData.rating,
      orderDetailId: reviewData.orderDetailId,
      userName: reviewData.userName,
    };

    const result = await submitReview(review);
    if (result) {
      // Close modal and refresh order details to update reviewed status
      setIsReviewModalOpen(false);
      showSuccess(t('review.success'));
      fetchOrderDetails(order.id);
    }
  };

  // View an existing review for an item
  const viewReview = async (orderDetailId: string) => {
    setViewingReviewFor(orderDetailId);
    await fetchReviews(
      0,
      10,
      undefined,
      undefined,
      undefined,
      undefined,
      orderDetailId
    );
  };

  // Close review viewer
  const closeReviewViewer = () => {
    setViewingReviewFor(null);
  };

  // Modal footer buttons
  const modalFooter = [
    <Button key="cancel" onClick={() => setIsReviewModalOpen(false)}>
      {t('common.cancel')}
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={reviewSubmitting}
      onClick={handleSubmitReview}
    >
      {t('review.submit')}
    </Button>,
  ];

  return (
    <div
      className="bg-white rounded-[15px] shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md"
      style={{
        transform: 'translateY(0)',
        opacity: 1,
        animation: 'fadeIn 0.5s ease-out',
      }}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Package className="w-5 h-5 text-gray-500" />
          <div>
            <h3 className="font-medium text-gray-900">{order.id}</h3>
            <p className="text-sm text-gray-500">
              {t('order.orderOn')}{' '}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <StatusBadge status={order.status} />
          <span className="font-medium text-gray-900">
            {formatCurrency(order.total, currencyCode)}
          </span>
          <button
            onClick={() => onViewStatus(order)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-[12px] transition-colors"
          >
            {t('order.viewStatus')}
          </button>
          <button
            onClick={handleToggleExpand}
            className="text-gray-500 focus:outline-none"
          >
            {expanded ? (
              <ChevronDown className="w-5 h-5 transition-transform duration-300" />
            ) : (
              <ChevronRight className="w-5 h-5 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 bg-gray-50">
          {loading ? (
            <Loading />
          ) : (
            <div className="space-y-3">
              {orderDetails.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-2 border-b border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.mainImageUrl}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <Link to={`/product/${item.product.id}`} target="_blank">
                        {' '}
                        <h4 className="font-medium hover:text-blue-500">
                          {item.product.name}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-500">
                        {item.color?.name}, {item.size?.name}
                      </p>
                      <p className="text-sm">
                        {formatCurrency(item.unitPrice, currencyCode)} x{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">
                      {formatCurrency(item.total, currencyCode)}
                    </div>
                    {/* Review button - either write or view based on status */}
                    {order.status === 'DELIVERED' && (
                      <>
                        {!item.reviewed ? (
                          <Button
                            type="default"
                            onClick={() => openReviewModal(item)}
                            icon={<Star className="w-3 h-3" />}
                            size="small"
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200"
                          >
                            {t('review.write')}
                          </Button>
                        ) : (
                          <Button
                            type="default"
                            onClick={() => viewReview(item.id)}
                            icon={<Star className="w-3 h-3 fill-green-500" />}
                            size="small"
                            className="bg-green-100 hover:bg-green-200 text-green-800 border-green-200"
                          >
                            {t('review.view')}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Review Viewer - using Ant Design Card */}
              {viewingReviewFor && reviews && reviews.length > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">{t('review.yourReview')}</h4>
                    <Button
                      type="text"
                      icon="✕"
                      onClick={closeReviewViewer}
                      className="text-gray-500 hover:text-gray-700"
                    />
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <Rate disabled value={reviews[0].rating} />
                      <span className="ml-2 text-sm font-medium">
                        {reviews[0].headline}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {reviews[0].comment}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(reviews[0].createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">{t('order.total')}</p>
            </div>
            <div className="font-medium text-lg text-gray-900">
              {formatCurrency(order.total, currencyCode)}
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={t('review.writeReview')}
        open={isReviewModalOpen}
        onCancel={() => setIsReviewModalOpen(false)}
        footer={modalFooter}
      >
        {selectedOrderDetail && (
          <>
            <div className="mb-4">
              <p className="text-sm mb-2">{selectedOrderDetail.product.name}</p>
              <Rate
                value={reviewData.rating}
                onChange={(value) =>
                  setReviewData({ ...reviewData, rating: value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('review.headline')}
              </label>
              <Input
                value={reviewData.headline}
                onChange={(e) =>
                  setReviewData({ ...reviewData, headline: e.target.value })
                }
                placeholder={t('review.headlinePlaceholder')}
                status={validationErrors.headline ? 'error' : ''}
              />
              {validationErrors.headline && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.headline}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('review.comment')}
              </label>
              <TextArea
                rows={4}
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
                placeholder={t('review.commentPlaceholder')}
                status={validationErrors.comment ? 'error' : ''}
              />
              {validationErrors.comment && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.comment}
                </p>
              )}
            </div>

            <div className="mb-4">
              {validationErrors.rating && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.rating}
                </p>
              )}
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderCard;
