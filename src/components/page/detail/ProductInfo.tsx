import type React from 'react'
import { useState } from 'react'
import StarRating from '../../shared/RatingStars'
import PriceDisplay from './PriceDisplay'
import ColorSelector from './ColorSelector'
import SizeSelector from './SizeSelector'
import QuantitySelector from './QuantitySelector'

const ProductInfo: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)

  const colors = [
    { id: 'brown', bg: 'bg-[#5D4B35]' },
    { id: 'green', bg: 'bg-[#2D4F44]' },
    { id: 'navy', bg: 'bg-[#1A2B4D]' },
  ]

  const sizes = ['Small', 'Medium', 'Large', 'X-Large']

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity((prev) => prev + 1)
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold mb-2">One Life Graphic T-shirt</h1>

      {/* Ratings */}
      <div className="flex items-center mb-4">
        <StarRating rating={4.5} />
      </div>

      {/* Price */}
      <div className="mb-4">
        <PriceDisplay currentPrice={260} originalPrice={300} discountPercentage={40} size="lg" />
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers
        superior comfort and style.
      </p>

      <ColorSelector colors={colors} selectedColor={selectedColor} onChange={setSelectedColor} />

      <SizeSelector sizes={sizes} selectedSize={selectedSize} onChange={setSelectedSize} />

      {/* Quantity and Add to Cart */}

      <div className="flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => handleQuantityChange('increase')}
          onDecrease={() => handleQuantityChange('decrease')}
        />
        <button className="flex-1 bg-black text-white py-3 px-6 rounded-[10px] hover:bg-gray-800 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductInfo
