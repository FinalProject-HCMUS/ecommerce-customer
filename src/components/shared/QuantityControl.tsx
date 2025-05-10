import { Plus, Minus } from 'lucide-react';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-[12px] overflow-hidden w-full min-w-[100px] max-w-[120px] sm:max-w-[140px]">
      <button
        onClick={onDecrement}
        className="flex-1 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-gray-600 mx-auto" />
      </button>
      <span className="flex-1 text-center  py-1 text-gray-800 font-medium text-sm sm:text-base">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="flex-1  py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-gray-600 mx-auto" />
      </button>
    </div>
  );
}
