import React from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils' // Import the `cn` utility function
import { Link } from 'react-router-dom'
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode // Button content
  className?: string // Additional custom classes
  onClick?: () => void // Callback function for button click
  variant?: 'primary' | 'secondary' | 'outline' // Button variants
  size?: 'sm' | 'md' | 'lg' // Button sizes
  isLoading?: boolean // Loading state
}

export const GeneralButton: React.FC<BtnProps> = ({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400',
    outline: 'border border-black text-black hover:bg-gray-100 focus:ring-black',
  }
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-5 py-3 text-lg',
  }

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        { 'opacity-50 cursor-not-allowed': disabled || isLoading },
        className, // Allow custom classes to be passed
      )}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export const BackToHomeButton: React.FC<ButtonProps> = (props) => (
  <Link to="/">
    <Button type="primary" icon={<HomeOutlined />} {...props}>
      Back to Home
    </Button>
  </Link>
)

export const LogoutButton: React.FC<ButtonProps> = (props) => (
  <Button icon={<LogoutOutlined />} {...props}>
    Logout
  </Button>
)
