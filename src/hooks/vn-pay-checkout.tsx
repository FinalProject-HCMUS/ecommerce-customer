import { useState } from 'react';
import { createVNPayPayment } from '../services/apis/orderApis';
import { CheckoutRequest } from '../interfaces/order/CheckOut';

export const useVNPayPayment = () => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const createPayment = async (
    checkoutData: CheckoutRequest,
    redirectImmediately = true
  ): Promise<string | null> => {
    setLoading(true);
    
    try {
      const url = await createVNPayPayment(checkoutData);
      setPaymentUrl(url);

      if (redirectImmediately && url) {
        window.location.href = url;
      }
      
      return url;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    paymentUrl,
    createPayment,
  };
};

export default useVNPayPayment;