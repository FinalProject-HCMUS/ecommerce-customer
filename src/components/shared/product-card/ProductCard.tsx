import { useState } from "react"
import ProductImage from "./ProductImage"
import RatingStars from "../RatingStars"
import QuantityControl from "../QuantityControl"
import AddToCartButton from "../AddToCartButton"
import { Product } from "../../../type/product"

interface ProductCardProps {
 product : Product
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }

  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow mb-2 duration-300">
      <ProductImage imageUrl={product.image}/>

      <div className="p-5">
        <h3 className="text-md font-semibold text-gray-800 mb-2">{product.name}</h3>
        <RatingStars rating={product.rating} />

        <div className="flex items-center justify-between mb-5 gap-2 mt-2">
          <span className="text font-bold text-gray-800">${product.price}</span>
          <QuantityControl quantity={quantity} onIncrement={incrementQuantity} onDecrement={decrementQuantity} />
        </div>

        <AddToCartButton isAdding={isAdding} onClick={handleAddToCart} />
      </div>
    </div>
  )
}

export default ProductCard;