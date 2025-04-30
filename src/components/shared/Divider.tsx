import React from 'react'
import { cn } from '../../lib/utils' // Utility function for merging classes

interface DividerProps {
  text?: string // Optional text to display in the divider
  className?: string // Additional custom classes
  textPosition?: 'center' | 'left' | 'right' // Position of the text
}

const Divider: React.FC<DividerProps> = ({ text, className, textPosition = 'center' }) => {
  return (
    <div className={cn('relative flex items-center my-4', className)}>
      {/* Left line */}
      <div
        aria-hidden="true"
        className={cn('w-full border-t border-gray-300', {
          'mr-4': text && textPosition === 'left',
          'ml-4': text && textPosition === 'right',
        })}
      ></div>

      {/* Text */}
      {text && (
        <span
          className={cn('px-4 text-sm text-gray-500 bg-white', {
            'absolute left-0': textPosition === 'left',
            'absolute right-0': textPosition === 'right',
          })}
        >
          {text}
        </span>
      )}

      {/* Right line */}
      <div
        aria-hidden="true"
        className={cn('w-full border-t border-gray-300', {
          'ml-4': text && textPosition === 'left',
          'mr-4': text && textPosition === 'right',
        })}
      ></div>
    </div>
  )
}

export default Divider
