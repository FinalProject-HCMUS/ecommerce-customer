import { useState } from 'react';
import {
  getAllProducts,
  getProductById,
  getTopProducts,
} from '../services/apis/productApis';
import { ProductResponse, Pageable } from '../interfaces';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchAllProducts = async ({
    page = 0,
    perPage = 16,
    sort,
    keySearch,
    category,
    fromPrice,
    topPrice,
    color,
    size,
  }: {
    page?: number;
    perPage?: number;
    sort?: string[];
    keySearch?: string;
    category?: string;
    fromPrice?: number;
    topPrice?: number;
    color?: string;
    size?: string;
  }): Promise<Pageable<ProductResponse[]> | undefined> => {
    setLoading(true);
    try {
      const response = await getAllProducts(
        page,
        perPage,
        sort,
        keySearch,
        category,
        fromPrice,
        topPrice,
        color,
        size
      );
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a product by ID
  const fetchProductById = async (id: string) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      return response.data || null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch top products (top-selling and top-trending)
  const fetchTopProducts = async (page: number = 1, size: number = 30) => {
    setLoading(true);
    try {
      const response = await getTopProducts(page, size);
      return response.data || null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchAllProducts,
    fetchProductById,
    fetchTopProducts,
  };
};
