import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';
import { t } from '../../helpers/i18n';
import { OrderResponse } from '../../interfaces/order/OrderResponse';
import { formatCurrency } from '../../helpers/string';
import { formatDate } from '../../utils/formatDate';
import { useSettingsContext } from '../../context/settingContext';

interface LocationState {
  order: OrderResponse;
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const order = state?.order;

  // Redirect to home if no order data is present
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  const { settings } = useSettingsContext();
  const currencyCode = (settings.find(
    (setting) => setting.key === 'CurrencyCode'
  )?.value || 'VND') as 'USD' | 'VND';

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen mt-10 mx-8 bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Order Success Message */}
        <div className="text-center my-10">
          <div className="mb-6">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            {t('checkout.orderConfirmed')}
          </h1>
          <p className="text-gray-600">
            {t('checkout.orderConfirmationEmail')}
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-[12px] p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {t('checkout.orderSummary')}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">{t('checkout.orderNumber')}</p>
              <p className="font-medium">{order.id}</p>
            </div>
            <div>
              <p className="text-gray-500">{t('checkout.orderDate')}</p>
              <p className="font-medium">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-gray-500">{t('checkout.deliveryAddress')}</p>
              <p className="font-medium">
                {order.firstName} {order.lastName}
              </p>
              <p className="font-medium">{order.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-500">{t('checkout.paymentMethod')}</p>
              <p className="font-medium">{order.paymentMethod}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>{t('checkout.subtotal')}</span>
              <span>{formatCurrency(order.subTotal, currencyCode)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t('checkout.shippingFee')}</span>
              <span>{formatCurrency(order.shippingCost, currencyCode)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>{t('checkout.total')}</span>
              <span>{formatCurrency(order.total, currencyCode)}</span>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-gray-50 rounded-[12px] p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            {t('checkout.orderStatus')}
          </h2>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
              <CheckCircleIcon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="font-medium">{order.status}</p>
              <p className="text-gray-500">
                {t('checkout.trackingInstructions')}
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-[12px] text-center hover:bg-blue-700 transition-colors"
          >
            {t('checkout.continueShopping')}
          </Link>
          <Link
            to="/orders"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-[12px] text-center hover:bg-gray-300 transition-colors"
          >
            {t('checkout.viewOrders')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
