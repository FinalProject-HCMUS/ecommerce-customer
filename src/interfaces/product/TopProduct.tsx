import { ProductResponse } from './ProductResponse';

export interface TopProduct {
  /**
   * Title of the top product category
   * @example "TOP SELLING"
   */
  title: string;

  /**
   * List of products in this category
   */
  data: ProductResponse[];
}

export interface Pagination {
  /**
   * Total number of pages
   * @example 1
   */
  totalPages: number;

  /**
   * Total number of items
   * @example 5
   */
  totalItems: number;

  /**
   * Current page number
   * @example 1
   */
  currentPage: number;
}

export interface TopProductResponse {
  /**
   * Pagination details
   */
  pagination: Pagination;

  /**
   * List of top product categories
   */
  topProducts: TopProduct[];
}
