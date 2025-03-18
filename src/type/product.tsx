export interface Product {
  id: number;
  name: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  color: string;
  image: string;
  sizes: string[];
  reviews: number;
}
