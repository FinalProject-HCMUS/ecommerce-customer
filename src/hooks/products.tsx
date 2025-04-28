import { useState } from 'react';
import { getAllProducts, getProductById, getTopProducts } from '../services/apis/productApis';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      return response.data || null;
    } catch (error) {
      console.error('Error fetching all products:', error);
      return null;
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
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      return null;
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
    } catch (error) {
      console.error('Error fetching top products:', error);
      return null;
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
