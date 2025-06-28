import type React from 'react';
import { ArrowRight } from 'lucide-react';
import { t } from '../../../helpers/i18n';
import { formatCurrency } from '../../../helpers/string';
import { OrderSummaryProps } from '../../../interfaces';
import { useSettingsContext } from '../../../context/settingContext';

const OrderSummary: React.FC<OrderSummaryProps> = ({
  data,
  isCheckoutEnabled = true,
  onCheckout,
}) => {
  const { subtotal, deliveryFee, total, selectedItemCount, totalItemCount } =
    data;
  const { settings } = useSettingsContext();
  const currencyCode = (settings.find(
    (setting) => setting.key === 'CurrencyCode'
  )?.value || 'VND') as 'USD' | 'VND';

  return (
    <div className="bg-white rounded-[12px] p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-6">{t('lbl.orderSummary')}</h2>

      {selectedItemCount !== undefined && totalItemCount !== undefined && (
        <div className="text-sm text-gray-600 mb-4">
          {t('lbl.selectedItems')}: {selectedItemCount}/{totalItemCount}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">{t('lbl.subTotal')}</span>
          <span className="font-medium">
            {formatCurrency(subtotal, currencyCode)}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">{t('lbl.deliveryFee')}</span>
          <span className="font-medium">
            {formatCurrency(deliveryFee, currencyCode)}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium">{t('lbl.total')}</span>
            <span className="text-lg font-bold">
              {formatCurrency(total, currencyCode)}
            </span>
          </div>
        </div>

        <button
          className="w-full bg-black text-white py-4 px-6 rounded-full mt-6 flex items-center justify-center"
          onClick={onCheckout}
          disabled={!isCheckoutEnabled}
          style={
            !isCheckoutEnabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}
          }
        >
          <span>{t('lbl.gotoCheckout')}</span>
          <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
