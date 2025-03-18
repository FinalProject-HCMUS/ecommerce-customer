"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps {
  id: string
  label: string
  placeholder?: string
}

const PasswordInput: React.FC<PasswordInputProps> = ({ id, label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  )
}

export default PasswordInput

