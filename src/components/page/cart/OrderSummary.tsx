import type React from 'react';
import { ArrowRight } from 'lucide-react';
import type { OrderSummaryProps } from '../../../interfaces/temp/cart';

const OrderSummary: React.FC<OrderSummaryProps> = ({ data }) => {
  const { subtotal, discountAmount, deliveryFee, total } = data;

  return (
    <div className="bg-white rounded-[12px] p-6 border border-gray-200">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount (-20%)</span>
          <span className="font-medium text-red-500">-${discountAmount}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium">${deliveryFee}</span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium">Total</span>
            <span className="text-lg font-bold">${total}</span>
          </div>
        </div>

        <button className="w-full bg-black text-white py-4 px-6 rounded-full mt-6 flex items-center justify-center">
          <span>Go to Checkout</span>
          <ArrowRight className="ml-2" size={18} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
