import { Plus, Minus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function QuantityControl({ quantity, onIncrement, onDecrement }: QuantityControlProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-[12px] overflow-hidden">
      <button
        onClick={onDecrement}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>
      <span className="px-4 py-1 text-gray-800 font-medium">{quantity}</span>
      <button
        onClick={onIncrement}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
}
