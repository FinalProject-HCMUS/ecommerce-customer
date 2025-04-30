import type React from 'react'

interface Product {
  id: number
  name: string
  size: string
  color: string
  price: number
  quantity: number
  image: string
}

interface ProductItemProps {
  product: Product
}

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="flex items-start">
      <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />

      <div className="flex-1">
        <h3 className="font-medium">{product.name}</h3>
        <div className="text-sm text-gray-500">
          <p>Size: {product.size}</p>
          <p>Color: {product.color}</p>
        </div>
        <p className="font-bold mt-1">${product.price}</p>
      </div>

      <div className="text-right">
        <span className="text-gray-700">x{product.quantity}</span>
      </div>
    </div>
  )
}
