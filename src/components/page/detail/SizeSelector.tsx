import type React from 'react'
import { t } from '../../../helpers/i18n'
import { SizeResponse } from '../../../interfaces'

interface SizeSelectorProps {
  sizes: SizeResponse[]
  selectedSize: string
  onChange: (size: string) => void
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-2">{t('lbl.chooseSize')}</h3>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            className={`px-4 py-2 rounded-[12px] transition-colors duration-200 ${
              selectedSize === size.id ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onChange(size.id)}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector
