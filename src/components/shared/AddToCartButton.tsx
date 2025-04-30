import { ShoppingCart } from 'lucide-react'

interface AddToCartButtonProps {
  isAdding: boolean
  onClick: () => void
}

export default function AddToCartButton({ isAdding, onClick }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isAdding}
      className={`w-full py-3 px-4 rounded-[12px] font-medium text-white transition-all duration-300 flex items-center justify-center
        ${isAdding ? 'bg-green-500' : 'bg-gray-800 hover:bg-gray-700'}`}
    >
      {isAdding ? (
        <span className="flex items-center">
          Added to Cart
          <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      ) : (
        <span className="flex items-center">
          Add to Cart
          <ShoppingCart className="w-5 h-5 ml-2" />
        </span>
      )}
    </button>
  )
}
