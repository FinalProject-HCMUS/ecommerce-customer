import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckoutForm } from '../../components/page/checkout/CheckoutForm';
import { OrderSummary } from '../../components/page/checkout/OrderSummary';
import Breadcrumb from '../../components/shared/Breadcrumb';
import { CartItemResponse } from '../../interfaces';
import { t } from '../../helpers/i18n';

interface LocationState {
  selectedCartItems: CartItemResponse[];
  orderSummary: {
    subtotal: number;
    deliveryFee: number;
    total: number;
  };
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<CartItemResponse[]>([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
  });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: '',
  });

  // Get selected cart items from navigation state
  useEffect(() => {
    const state = location.state as LocationState;

    if (
      !state ||
      !state.selectedCartItems ||
      state.selectedCartItems.length === 0
    ) {
      // If no items were passed, redirect back to cart
      navigate('/cart');
      return;
    }

    setSelectedItems(state.selectedCartItems);
    setOrderSummary(state.orderSummary);
  }, [location, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    });
  };

  const handleSubmit = () => {
    // Process checkout with selectedItems and formData
    console.log('Form submitted:', formData);
    console.log('Selected items:', selectedItems);
    console.log('Order summary:', orderSummary);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen mt-10 mx-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: t('breadcrumb.home'), path: '/' },
            { label: t('breadcrumb.cart'), path: '/cart' },
            { label: t('breadcrumb.checkout'), path: '/checkout' },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-1/2">
            <CheckoutForm
              formData={formData}
              onInputChange={handleInputChange}
              onPaymentMethodChange={handlePaymentMethodChange}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-100 rounded-[12px] p-6">
              <OrderSummary
                items={selectedItems}
                summary={orderSummary}
                handlePayment={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
