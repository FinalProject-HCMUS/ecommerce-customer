import type React from 'react';
import { useState } from 'react';
import { Package, ChevronDown, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { OrderResponse, PaymentMethod } from '../../../interfaces';
import { formatCurrency } from '../../../helpers/string';
import { t } from 'i18next';
import { useOrderDetails } from '../../../hooks/order-detail';
import Loading from '../../shared/Loading';
import { Link } from 'react-router-dom';
import { useSettingsContext } from '../../../context/settingContext';
import { useRetryVNPay } from '../../../hooks/vn-pay-checkout';

interface OrderCardProps {
  order: OrderResponse;
  onViewStatus: (order: OrderResponse) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const { orderDetails, loading, fetchOrderDetails } = useOrderDetails();
  const { loading: retryLoading, retryPayment } = useRetryVNPay();

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

  // Handler for re-checkout
  const handleReCheckout = async () => {
    await retryPayment(order.id);
  };

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
          {/* Payment Method Badge */}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold
              ${order.paymentMethod === PaymentMethod.COD
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-100 text-blue-700'}
            `}
            title={order.paymentMethod}
          >
            {order.paymentMethod === PaymentMethod.COD ? 'COD' : 'VN Pay'}
          </span>
          {/* isPaid Badge */}
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold
              ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
            `}
            title={order.isPaid ? t('order.paid') : t('order.unpaid')}
          >
            {order.isPaid ? t('order.paid') : t('order.unpaid')}
          </span>
          {/* Re-checkout Button for VN_PAY and not paid */}
          {order.paymentMethod === PaymentMethod.VN_PAY && !order.isPaid && (
            <button
              onClick={handleReCheckout}
              disabled={retryLoading}
              className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-[12px] transition-colors disabled:opacity-60"
            >
              {retryLoading
                ? t('order.reCheckoutLoading', 'Đang chuyển hướng...')
                : t('order.reCheckout', 'Thanh toán lại')}
            </button>
          )}
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
                  </div>
                </div>
              ))}
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
    </div>
  );
};

export default OrderCard;
