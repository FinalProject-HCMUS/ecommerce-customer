import { useCallback, useEffect, useState } from 'react';
import { checkout, searchOrders } from '../services/apis/orderApis';
import { CheckoutRequest } from '../interfaces/order/CheckOut';
import { OrderResponse } from '../interfaces/order/OrderResponse';
import { CustomResponse } from '../interfaces/common/CustomResponse';
import { OrderSearchParams } from '../interfaces/order/OrderSearchParams';
import { Pageable } from '../interfaces';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);

  const performCheckout = async (checkoutData: CheckoutRequest): Promise<CustomResponse<OrderResponse> | undefined> => {
    setLoading(true);
    try {
      const response = await checkout(checkoutData);
      
      if (response.isSuccess && response.data) {
        setOrderResponse(response.data);
      }
      
      setLoading(false);
      return response;
    } catch {
      setLoading(false);
      return undefined;
    }
  };

  return {
    loading,
    orderResponse,
    performCheckout
  };
};

export const useOrderSearch = (initialParams?: OrderSearchParams) => {
  const [searchParams, setSearchParamsState] = useState<OrderSearchParams>(initialParams || {
    page: 0,
    size: 10,
  });
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageable, setPageable] = useState<Pageable<OrderResponse[]>>();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    console.log('Fetching orders with params:', searchParams);
    try {
      const response = await searchOrders(searchParams);
      if (response.isSuccess && response.data) {
        setOrders(response.data.content);
        setPageable(response.data);
      } 
    }  finally {
      setLoading(false);
    }
  }, [searchParams]);

  // Update search parameters and fetch results
  const setSearchParams = useCallback((params: Partial<OrderSearchParams>) => {
    setSearchParamsState(prev => {
      // If changing filters (not pagination), reset to first page
      if (params.keyword !== undefined || params.status !== undefined || params.size !== undefined) {
        return { ...prev, ...params, page: 0 };
      }
      return { ...prev, ...params };
    });
  }, []);

  // Function to manually refresh results
  const refresh = useCallback(async () => {
    await fetchOrders();
  }, [fetchOrders]);

  // Fetch orders whenever search params change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    pageable,
    searchParams,
    setSearchParams,
    refresh,
  };
};