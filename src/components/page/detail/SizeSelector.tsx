import type React from "react"

interface SizeSelectorProps {
  sizes: string[]
  selectedSize: string
  onChange: (size: string) => void
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Choose Size</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 rounded-[12px] transition-colors duration-200 ${
              selectedSize === size ? "bg-black text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => onChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector

