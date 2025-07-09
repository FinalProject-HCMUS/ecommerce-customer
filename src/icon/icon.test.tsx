import { render } from '@testing-library/react';
import {
  StarIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  HeartIcon,
} from './icon';

describe('Icon Components', () => {
  describe('StarIcon', () => {
    it('renders half-filled star correctly', () => {
      render(<StarIcon filled={true} half={true} />);
      const starIcon = document.querySelector('svg');

      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveClass('w-5', 'h-5', 'text-yellow-400');
      expect(document.querySelector('linearGradient')).toBeInTheDocument();
      expect(
        document.querySelector('path[fill="url(#half-fill)"]')
      ).toBeInTheDocument();
    });
  });

  describe('ShoppingCartIcon', () => {
    it('renders correctly with default classes', () => {
      render(<ShoppingCartIcon />);
      const cartIcon = document.querySelector('svg');

      expect(cartIcon).toBeInTheDocument();
      expect(cartIcon).toHaveClass('w-5', 'h-5');
      expect(cartIcon?.getAttribute('fill')).toBe('none');
    });

    it('applies custom className when provided', () => {
      render(<ShoppingCartIcon className="custom-class" />);
      const cartIcon = document.querySelector('svg');

      expect(cartIcon).toHaveClass('w-5', 'h-5', 'custom-class');
    });
  });

  describe('PlusIcon', () => {
    it('renders correctly', () => {
      render(<PlusIcon />);
      const plusIcon = document.querySelector('svg');

      expect(plusIcon).toBeInTheDocument();
      expect(plusIcon).toHaveClass('w-4', 'h-4');
      expect(plusIcon?.getAttribute('fill')).toBe('none');
      expect(
        document.querySelector('path[d="M12 4.5v15m7.5-7.5h-15"]')
      ).toBeInTheDocument();
    });
  });

  describe('MinusIcon', () => {
    it('renders correctly', () => {
      render(<MinusIcon />);
      const minusIcon = document.querySelector('svg');

      expect(minusIcon).toBeInTheDocument();
      expect(minusIcon).toHaveClass('w-4', 'h-4');
      expect(minusIcon?.getAttribute('fill')).toBe('none');
      expect(
        document.querySelector('path[d="M19.5 12h-15"]')
      ).toBeInTheDocument();
    });
  });

  describe('HeartIcon', () => {
    it('renders correctly with default classes', () => {
      render(<HeartIcon />);
      const heartIcon = document.querySelector('svg');

      expect(heartIcon).toBeInTheDocument();
      expect(heartIcon).toHaveClass('w-5', 'h-5');
      expect(heartIcon?.getAttribute('fill')).toBe('none');
    });

    it('applies custom className when provided', () => {
      render(<HeartIcon className="text-red-500" />);
      const heartIcon = document.querySelector('svg');

      expect(heartIcon).toHaveClass('w-5', 'h-5', 'text-red-500');
    });
  });
});
