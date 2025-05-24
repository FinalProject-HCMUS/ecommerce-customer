import type React from 'react';
import { useState } from 'react';
import { Package, ChevronDown, ChevronRight } from 'lucide-react';
import type { Order } from '../../../interfaces/temp/order';
import StatusBadge from './StatusBadge';
import OrderItem from './OrderItem';

interface OrderCardProps {
  order: Order;
  onViewStatus: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewStatus }) => {
  const [expanded, setExpanded] = useState(false);

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
            <h3 className="font-medium text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-500">
              Ordered on {new Date(order.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <StatusBadge status={order.status} />
          <span className="font-medium text-gray-900">
            ${order.total.toFixed(2)}
          </span>
          <button
            onClick={() => onViewStatus(order)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-[12px] transition-colors"
          >
            View Status
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
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
          <div className="space-y-3">
            {order.items.map((item) => (
              <OrderItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="font-medium text-lg text-gray-900">
              ${order.total.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
