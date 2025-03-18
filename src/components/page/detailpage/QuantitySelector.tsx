import type React from "react"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-[8px]">
      <button
        className="px-3 py-2 hover:bg-gray-100 transition-colors"
        onClick={onDecrease}
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 py-2">{quantity}</span>
      <button
        className="px-3 py-2 hover:bg-gray-100 transition-colors"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  )
}

export default QuantitySelector

