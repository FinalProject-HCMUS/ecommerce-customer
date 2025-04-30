import type React from 'react'

interface Color {
  id: string
  bg: string
}

interface ColorSelectorProps {
  colors: Color[]
  selectedColor: string
  onChange: (colorId: string) => void
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">Select Colors</h3>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            className={`w-8 h-8 rounded-full ${color.bg} transition-transform duration-200 ${
              selectedColor === color.id ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-105'
            }`}
            onClick={() => onChange(color.id)}
            aria-label={`Select ${color.id} color`}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorSelector
