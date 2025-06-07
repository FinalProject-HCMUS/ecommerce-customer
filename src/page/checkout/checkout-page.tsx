import type React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckoutForm } from '../../components/page/checkout/CheckoutForm';
import { OrderSummary } from '../../components/page/checkout/OrderSummary';
import Breadcrumb from '../../components/shared/Breadcrumb';
import { CartItemResponse } from '../../interfaces';
import { t } from '../../helpers/i18n';
import { useCheckout } from '../../hooks/order';
import { toast } from 'react-toastify'; // Assuming you use this for notifications
import { showError, showSuccess } from '../../utils/messageRender';
import { useSelector } from 'react-redux';
import { RootState } from '../../context/store';

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
  const { loading, performCheckout } = useCheckout();
  const [selectedItems, setSelectedItems] = useState<CartItemResponse[]>([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    deliveryFee: 0,
    total: 0,
  });
  const { userInfo } = useSelector((state: RootState) => state.auth);

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

  const validateForm = (): boolean => {
    // Name validation
    if (!formData.name.trim()) {
      showError(t('checkout.validation.nameRequired'));
      return false;
    }

    // Phone validation - simple pattern for demonstration
    const phonePattern = /^[0-9]{9,11}$/;
    if (!formData.phone.trim() || !phonePattern.test(formData.phone.trim())) {
      showError(t('checkout.validation.invalidPhone'));
      return false;
    }

    // Address validation
    if (!formData.address.trim()) {
      showError(t('checkout.validation.addressRequired'));
      return false;
    }

    // Payment method validation
    if (!formData.paymentMethod) {
      showError(t('checkout.validation.selectPaymentMethod'));
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Validate form data
    if (!validateForm()) {
      return;
    }

    // Split name into firstName and lastName
    const nameParts = formData.name.trim().split(' ');
    const lastName = nameParts.pop() || '';
    const firstName = nameParts.join(' ') || lastName;

    // Map cart items to order details format
    const orderDetails = selectedItems.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
    }));

    try {
      const checkoutData = {
        firstName,
        lastName,
        phoneNumber: formData.phone.trim(),
        address: formData.address.trim(),
        paymentMethod: formData.paymentMethod,
        orderDetails: orderDetails,
        customerId: userInfo?.id || '',
      };

      const response = await performCheckout(checkoutData);

      if (response?.isSuccess) {
        showSuccess(t('checkout.orderSuccess'));
        navigate('/order-confirmation', {
          state: { order: response.data },
        });
      } else {
        showError(t('checkout.orderFailed'));
      }
    } catch {
      toast.error(t('checkout.orderFailed'));
    }
  };

  return (
    <div className="min-h-screen mt-10 mx-8 bg-white">
      <div className="mx-auto px-4 py-8">
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
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
