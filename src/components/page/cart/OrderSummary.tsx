import type React from 'react';
import { ArrowRight } from 'lucide-react';
import type { OrderSummaryProps } from '../../../interfaces/temp/cart';
import { t } from '../../../helpers/i18n';
import { formatCurrency } from '../../../helpers/string';

const OrderSummary: React.FC<OrderSummaryProps> = ({ data }) => {
  const { subtotal, deliveryFee, total } = data;

  return (
    <div className="bg-white rounded-[12px] p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('lbl.orderSummary')}</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">{t('lbl.subTotal')}</span>
          <span className="font-medium">{formatCurrency(subtotal, 'VND')}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">{t('lbl.deliveryFee')}</span>
          <span className="font-medium">
            {formatCurrency(deliveryFee, 'VND')}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium">{t('lbl.total')}</span>
            <span className="text-lg font-bold">
              {formatCurrency(total, 'VND')}
            </span>
          </div>
        </div>

        <button className="w-full bg-black text-white py-4 px-6 rounded-full mt-6 flex items-center justify-center">
          <span>{t('lbl.gotoCheckout')}</span>
          <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
