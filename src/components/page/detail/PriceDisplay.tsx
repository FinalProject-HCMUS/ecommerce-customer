import type React from 'react';
import { formatCurrency } from '../../../helpers/string';

interface PriceDisplayProps {
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  size?: 'sm' | 'md' | 'lg';
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  currentPrice,
  originalPrice,
  discountPercentage,
  size = 'md',
}) => {
  const sizes = {
    sm: {
      current: 'text-base font-bold',
      original: 'text-sm text-gray-400 line-through',
      discount: 'text-xs text-red-500 bg-red-100 px-1.5 py-0.5 rounded',
    },
    md: {
      current: 'text-xl font-bold',
      original: 'text-base text-gray-400 line-through',
      discount: 'text-xs text-red-500 bg-red-100 px-2 py-0.5 rounded',
    },
    lg: {
      current: 'text-2xl font-bold',
      original: 'text-xl text-gray-400 line-through',
      discount: 'text-sm text-red-500 bg-red-100 px-2 py-0.5 rounded',
    },
  };

  return (
    <div className="flex items-center gap-2">
      <span className={sizes[size].current}>
        {formatCurrency(currentPrice, 'USD')}
      </span>
      {discountPercentage != 0 && (
        <span className={sizes[size].original}>
          {formatCurrency(originalPrice, 'USD')}
        </span>
      )}
      {discountPercentage != 0 && (
        <span className={sizes[size].discount}>-{discountPercentage}%</span>
      )}
    </div>
  );
};

export default PriceDisplay;
