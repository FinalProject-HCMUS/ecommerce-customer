import { Review } from '../interfaces/review';

export const reviews: Review[] = [
  {
    id: 1,
    author: 'Samantha D.',
    isVerified: true,
    rating: 4.5,
    content:
      '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: 'August 14, 2023',
  },
  {
    id: 2,
    author: 'John M.',
    isVerified: false,
    rating: 4.0,
    content:
      '"Great quality and fast shipping. The shirt fits perfectly, and I\'ve received so many compliments on it!"',
    date: 'August 10, 2023',
  },
  {
    id: 3,
    author: 'Emily R.',
    isVerified: true,
    rating: 5.0,
    content:
      '"This is hands down the best purchase I\'ve made this year. The material is soft, and the design is stunning!"',
    date: 'August 5, 2023',
  },
  // Add more reviews as needed
];
