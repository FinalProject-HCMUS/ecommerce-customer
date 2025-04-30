import React from 'react'
import { Trash2 } from 'lucide-react'
import QuantityControl from './QuantityControl'
import type { CartItemProps } from '../../../interfaces/temp/cart'

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="bg-white rounded-[12px] p-6 border border-gray-200">
      <div className="flex items-center">
        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={item.image || '/placeholder.svg'}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
              <p className="mt-1 text-sm text-gray-500">Size: {item.size}</p>
              <p className="mt-1 text-sm text-gray-500">Color: {item.color}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-medium">${item.price}</p>
            <QuantityControl
              quantity={item.quantity}
              onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
