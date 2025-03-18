import type React from "react"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 transition-colors">
      {children}
    </button>
  )
}

export default Button

