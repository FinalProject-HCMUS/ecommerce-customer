import React from 'react';
import { CartItemResponse } from '../../../interfaces';
import { formatCurrency } from '../../../helpers/string';
import { t } from '../../../helpers/i18n';
import { GeneralButton } from '../../shared/Button';
import { useSettingsContext } from '../../../context/settingContext';

interface OrderSummaryProps {
  items: CartItemResponse[];
  summary: {
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
  handlePayment: () => void;
  loading?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  summary,
  handlePayment,
  loading,
}) => {
  const { subtotal, deliveryFee, total } = summary;
  const { settings } = useSettingsContext();
  const currencyCode = (settings.find(
    (setting) => setting.key === 'CurrencyCode'
  )?.value || 'VND') as 'USD' | 'VND';

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">{t('lbl.orderSummary')}</h2>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <div key={item.id} className="py-4 flex">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={item.product.mainImageUrl}
                alt={item.product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>{item.product.name}</h3>
                  <p className="ml-4">
                    {formatCurrency(
                      ((item.product.price *
                        (100 - item.product.discountPercent)) /
                        100) *
                        item.quantity,
                      currencyCode
                    )}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {`${t('lbl.quantity')}: ${item.quantity}`}
                </p>
                {item.color && (
                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                    {t('lbl.color')}:{' '}
                    <span
                      className="ml-1 inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </p>
                )}
                {item.size && (
                  <p className="mt-1 text-sm text-gray-500">
                    {`${t('lbl.size')}: ${item.size}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="flex justify-between text-sm">
          <p className="text-gray-600">{t('lbl.subTotal')}</p>
          <p className="font-medium">
            {formatCurrency(subtotal, currencyCode)}
          </p>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <p className="text-gray-600">{t('lbl.deliveryFee')}</p>
          <p className="font-medium">
            {formatCurrency(deliveryFee, currencyCode)}
          </p>
        </div>
        <div className="flex justify-between text-base font-medium mt-4">
          <p>{t('lbl.total')}</p>
          <p>{formatCurrency(total, currencyCode)}</p>
        </div>
      </div>

      <GeneralButton
        type="submit"
        isLoading={loading}
        onClick={handlePayment}
        className="w-full mt-6 bg-black text-white py-4 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        {t('lbl.makePayment')}
      </GeneralButton>
    </div>
  );
};
