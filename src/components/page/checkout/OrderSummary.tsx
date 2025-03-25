import type React from 'react';
import { ProductItem } from './ProductItem';

export const OrderSummary: React.FC = () => {
  const products = [
    {
      id: 1,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: '',
    },
    {
      id: 2,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: '',
    },
    {
      id: 3,
      name: 'Checkered Shirt',
      size: 'Medium',
      color: 'Red',
      price: 180,
      quantity: 1,
      image: '',
    },
  ];

  const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const discountRate = 0.2; // 20%
  const discountAmount = Math.round(subtotal * discountRate);
  const deliveryFee = 15;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div>
      <div className="space-y-4 mb-8">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="space-y-3">
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

          <div className="flex justify-between pt-3 border-t border-gray-200">
            <span className="font-bold">Total</span>
            <span className="font-bold text-xl">${total}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-black text-white py-4 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
        >
          MAKE PAYMENT
        </button>
      </div>
    </div>
  );
};
