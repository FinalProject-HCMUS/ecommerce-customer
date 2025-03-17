import { Product } from '../type/product';

interface ProductCategory {
  title: string;
  data: Product[];
}

export const products: ProductCategory[] = [
  {
    title: 'TOP SELLING',
    data: [
      { id: 1, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45 },
      { id: 2, title: 'T-shirt with Tape Details', price: 145, rating: 4, reviews: 45 },
      { id: 3, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45 },
      { id: 4, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45 },
      { id: 5, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45 },
    ],
  },
  {
    title: 'TOP TRENDING',
    data: [
      { id: 1, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45 },
      { id: 2, title: 'T-shirt with Tape Details', price: 145, rating: 4, reviews: 45 },
      { id: 3, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45 },
      { id: 4, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45 },
      { id: 5, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45 },
    ],
  },
];
