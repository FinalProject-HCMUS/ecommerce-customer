import type React from 'react';
import { useState } from 'react';
import { Package, ChevronDown, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { OrderResponse } from '../../../interfaces';
import { formatCurrency } from '../../../helpers/string';
import { t } from 'i18next';
import { useOrderDetails } from '../../../hooks/order-detail';
import Loading from '../../shared/Loading';

interface OrderCardProps {
  order: OrderResponse;
  onViewStatus: (order: OrderResponse) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const { orderDetails, loading, fetchOrderDetails } = useOrderDetails();

  // Fetch order details when expanded
  const handleToggleExpand = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);

    // Fetch order details when expanding
    if (newExpandedState) {
      fetchOrderDetails(order.id);
    }
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
          <span className="font-medium text-gray-900">
            {formatCurrency(order.total, 'VND')}
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
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
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
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.color?.name}, {item.size?.name}
                      </p>
                      <p className="text-sm">
                        {formatCurrency(item.unitPrice, 'VND')} x{' '}
                        {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="font-medium">
                    {formatCurrency(item.total, 'VND')}
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
              {formatCurrency(order.total, 'VND')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
