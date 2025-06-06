import { useState, useEffect, useCallback } from 'react';
import { getOrderDetailsByOrderId } from '../services/apis/detailOrderApis';
import { OrderDetailWithProductResponse } from '../interfaces/order/OrderDetailWithProductResponse';
import { CustomResponse } from '../interfaces/common/CustomResponse';

export const useOrderDetails = (initialOrderId?: string) => {
  const [orderId, setOrderId] = useState<string | undefined>(initialOrderId);
  const [orderDetails, setOrderDetails] = useState<
    OrderDetailWithProductResponse[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchOrderDetails = useCallback(
    async (
      id?: string
    ): Promise<
      CustomResponse<OrderDetailWithProductResponse[]> | undefined
    > => {
      const orderIdToUse = id || orderId;

      if (!orderIdToUse) {
        return undefined;
      }

      setLoading(true);

      try {
        const response = await getOrderDetailsByOrderId(orderIdToUse);

        if (response.isSuccess) {
          setOrderDetails(response.data || []);
        }

        setLoading(false);
        return response;
      } catch {
        setLoading(false);
        return undefined;
      }
    },
    [orderId]
  );

  // Fetch order details when orderId changes
  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId, fetchOrderDetails]);

  return {
    orderDetails,
    loading,
    fetchOrderDetails,
    setOrderId,
  };
};
