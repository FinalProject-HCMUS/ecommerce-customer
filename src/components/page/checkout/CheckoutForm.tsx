import type React from 'react';
import { PAYMENT_METHOD } from '../../../constants/common';
import { t } from '../../../helpers/i18n';

interface CheckoutFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPaymentMethodChange: (method: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  formData,
  onInputChange,
  onPaymentMethodChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">
          {t('lbl.shippingInformation')}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('lbl.receiverName')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('lbl.receiverPhone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {t('lbl.receiverAddress')}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            className="w-full p-3 border border-gray-300 rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t('lbl.paymentMethod')}</h2>

        <div className="space-y-3">
          {PAYMENT_METHOD.map((method) => (
            <div key={method.id} className="flex items-center">
              <input
                type="radio"
                id={method.id}
                name="paymentMethod"
                value={method.id}
                checked={formData.paymentMethod === method.id}
                onChange={() => onPaymentMethodChange(method.id)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={method.id}
                className="ml-3 text-base font-medium text-gray-700"
              >
                {method.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
