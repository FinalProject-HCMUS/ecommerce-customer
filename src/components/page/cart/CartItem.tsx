import React from 'react';
import { Trash2 } from 'lucide-react';
import QuantityControl from './QuantityControl';
import { CartItemResponse } from '../../../interfaces';
import { t } from '../../../helpers/i18n';
import { Link } from 'react-router-dom';

export interface CartItemProps {
  item: CartItemResponse;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string, isSelected: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeItem,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-[12px] p-6 border border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            id={`item-${item.id}`}
            checked={isSelected}
            onChange={(e) => onSelect(item.id, e.target.checked)}
            className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
            aria-label={`Select ${item.product.name} for checkout`}
          />
        </div>

        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-[12px] border border-gray-200">
          <img
            src={item.product.mainImageUrl}
            className="h-full w-full object-cover object-center"
            alt={item.product.name}
          />
        </div>

        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <div>
              <Link
                to={`/product/${item.product.id}`}
                className="text-lg font-medium text-gray-900 hover:text-blue-600"
              >
                {item.product.name}
              </Link>
              <p className="mt-1 text-sm text-gray-500">{`${t('lbl.size')}: ${item.size}`}</p>
              <p className="mt-1 text-sm text-gray-500">
                {t('lbl.color')}:{' '}
                <button
                  style={{
                    backgroundColor: item.color,
                  }}
                  className="w-3 h-3 rounded-full transition-transform duration-200 hover:scale-105 py-1"
                />
              </p>
              <p className="mt-2 text-md font-medium text-gray-900">
                {(
                  (item.product.price * (100 - item.product.discountPercent)) /
                  100
                ).toLocaleString('vi-VN')}{' '}
                ₫
              </p>
            </div>
            <div className="flex flex-col items-end">
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
                data-testid={`remove-item-${item.id}`}
              >
                <Trash2 size={18} />
              </button>
              <div className="flex flex-end mt-4">
                <QuantityControl
                  quantity={item.quantity}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
