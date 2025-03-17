import { Product } from '../type/product';

interface ProductCategory {
  title: string;
  data: Product[];
}

export const topProducts: ProductCategory[] = [
  {
    title: 'TOP SELLING',
    data: [
      { id: 1, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image1.jpg', sizes: ['S', 'M', 'L'] },
      { id: 2, title: 'T-shirt with Tape Details', price: 145, rating: 4, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image2.jpg', sizes: ['S', 'M', 'L'] },
      { id: 3, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image3.jpg', sizes: ['S', 'M', 'L'] },
      { id: 4, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image4.jpg', sizes: ['S', 'M', 'L'] },
      { id: 5, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image5.jpg', sizes: ['S', 'M', 'L'] },
    ],
  },
  {
    title: 'TOP TRENDING',
    data: [
      { id: 1, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image1.jpg', sizes: ['S', 'M', 'L'] },
      { id: 2, title: 'T-shirt with Tape Details', price: 145, rating: 4, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image2.jpg', sizes: ['S', 'M', 'L'] },
      { id: 3, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image3.jpg', sizes: ['S', 'M', 'L'] },
      { id: 4, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image4.jpg', sizes: ['S', 'M', 'L'] },
      { id: 5, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image5.jpg', sizes: ['S', 'M', 'L'] },
    ],
  },
];

export const products: Product[] = [
  { id: 1, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image1.jpg', sizes: ['S', 'M', 'L'] },
  { id: 2, title: 'T-shirt with Tape Details', price: 145, rating: 4, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image2.jpg', sizes: ['S', 'M', 'L'] },
  { id: 3, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image3.jpg', sizes: ['S', 'M', 'L'] },
  { id: 4, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image4.jpg', sizes: ['S', 'M', 'L'] },
  { id: 5, title: 'T-shirt with Tape Details', price: 145, rating: 5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image5.jpg', sizes: ['S', 'M', 'L'] },
  { id: 6, title: 'T-shirt with Tape Details', price: 145, rating: 4.5, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image1.jpg', sizes: ['S', 'M', 'L'] },
  { id: 7, title: 'T-shirt with Tape Details', price: 145, rating: 4, reviews: 45, name: 'T-shirt', category: 'Clothing', color: 'Red', image: 'image2.jpg', sizes: ['S', 'M', 'L'] },
]