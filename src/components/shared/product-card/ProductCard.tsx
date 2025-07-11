import { useState } from 'react';
import ProductImage from './ProductImage';
import QuantityControl from '../QuantityControl';
import AddToCartButton from '../AddToCartButton';
import QuickAddDialog from './QuickAddDialog';
import { ProductResponse } from '../../../interfaces/product/ProductResponse';
import { formatCurrency } from '../../../helpers/string';
import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars';
import { useSettingsContext } from '../../../context/settingContext';

interface ProductCardProps {
  product: ProductResponse;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { settings } = useSettingsContext();
  const currencyCode = (settings.find(
    (setting) => setting.key === 'CurrencyCode'
  )?.value || 'VND') as 'USD' | 'VND';

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="max-w-sm w-full mx-auto overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow mb-4 duration-300 sm:max-w-xs md:max-w-md lg:max-w-lg">
        <ProductImage id={product.id} imageUrl={product.mainImageUrl} />

        <div className="p-4 sm:p-5 truncate">
          <Link
            to={`/product/${product.id}`}
            className="text-md font-semibold text-gray-800 mb-2 "
          >
            {product.name}
          </Link>
          <RatingStars rating={product.averageRating} />

          <div className="flex items-center justify-between mb-4 gap-2 mt-2">
            <span className="text font-bold text-gray-800">
              {formatCurrency(product.price, currencyCode)}
            </span>
            <QuantityControl
              quantity={quantity}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />
          </div>

          <AddToCartButton isAdding={false} onClick={handleAddToCart} />
        </div>
      </div>

      {/* Quick Add Dialog */}
      <QuickAddDialog
        product={product}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ProductCard;
