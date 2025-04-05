import type React from 'react';
import StarRating from './StarRating';
import PriceDisplay from './PriceDisplay';

interface ProductCardProps {
  name: string;
  image: string;
  rating: number;
  currentPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  rating,
  currentPrice,
  originalPrice,
  discountPercentage,
}) => {
  return (
    <div className="group">
      <div className="bg-gray-100 rounded-md aspect-square mb-3 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="font-medium mb-1">{name}</h3>
      <div className="mb-1">
        <StarRating rating={rating} showScore={true} size="sm" />
      </div>
      <PriceDisplay
        currentPrice={currentPrice}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
        size="sm"
      />
    </div>
  );
};

export default ProductCard;
