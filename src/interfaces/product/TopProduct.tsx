import { ProductResponse } from './ProductResponse';

export interface TopProduct {
  title: string;
  data: ProductResponse[];
}

export interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export interface TopProductResponse {
  pagination: Pagination;
  topProducts: TopProduct[];
}
