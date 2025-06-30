import type React from 'react';
import { useState } from 'react';
import PriceDisplay from './PriceDisplay';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import { useEffect } from 'react';
import { t } from '../../../helpers/i18n';

import {
  ProductResponse,
  ColorResponse,
  ProductColorSizeResponse,
  SizeResponse,
} from '../../../interfaces';

interface ProductInfoProps {
  product: ProductResponse;
  colors: ColorResponse[];
  productColorSize: ProductColorSizeResponse[];
  sizes: SizeResponse[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  colors,
  productColorSize,
  sizes,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const [quantityAvailable, setQuantityAvailable] = useState<number>(
    product.total || 0
  );

  // Update quantityAvailable when selectedColor or selectedSize changes
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const matchingProduct = productColorSize.find(
        (pcs) => pcs.color.id === selectedColor && pcs.size.id === selectedSize
      );
      if (matchingProduct) {
        setQuantityAvailable(matchingProduct.quantity);
      } else {
        setQuantityAvailable(0);
      }
    } else {
      setQuantityAvailable(product.total || 0); // Reset to total if no color or size is selected
    }
  }, [selectedColor, selectedSize, productColorSize, product.total]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        {
          <span className="text-xs font-semibold text-blue-800 bg-blue-100 px-4 py-1 rounded-full mt-1 inline-block">
            {`${t('lbl.quantity')}: ${quantityAvailable}`}
          </span>
        }
        {
          <span
            className={`text-xs font-semibold ${quantityAvailable > 0 ? 'text-green-800 bg-green-100' : 'text-red-800 bg-red-100'} px-4 py-1 rounded-full`}
          >
            {quantityAvailable > 0 ? t('lbl.inStock') : t('lbl.outOfStock')}
          </span>
        }
      </div>
      
      {/* Price */}
      <div className="mb-4">
        <PriceDisplay
          currentPrice={(product.price * (100 - product.discountPercent)) / 100}
          originalPrice={product.price}
          discountPercentage={product.discountPercent}
          size="lg"
        />
      </div>

      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        onChange={setSelectedColor}
      />

      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onChange={setSelectedSize}
      />
    </div>
  );
};

export default ProductInfo;
