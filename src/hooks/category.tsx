import { useState } from 'react';
import { CategoryResponse } from '../interfaces';
import {
  getAllCategories,
  getAllCategoriesWithoutPagination,
  getCategoryById,
} from '../services/apis/category';
import { Pageable } from '../interfaces/common/Pageable';
import { CATEGORY_PER_PAGE } from '../constants/common';

export const useCategory = () => {
  const [loading, setLoading] = useState(false);

  // Fetch paginated categories
  const fetchCategories = async (
    page: number = 0,
    size: number = CATEGORY_PER_PAGE,
    sort?: string[]
  ): Promise<Pageable<CategoryResponse[]> | undefined> => {
    setLoading(true);
    try {
      const response = await getAllCategories(page, size, sort);
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories without pagination
  const fetchAllCategories = async (): Promise<
    CategoryResponse[] | undefined
  > => {
    setLoading(true);
    try {
      const response = await getAllCategoriesWithoutPagination();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single category by ID
  const fetchCategoryById = async (
    id: string
  ): Promise<CategoryResponse | null> => {
    setLoading(true);
    try {
      const response = await getCategoryById(id);
      return response.data || null;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    fetchCategories,
    fetchAllCategories,
    fetchCategoryById,
  };
};
