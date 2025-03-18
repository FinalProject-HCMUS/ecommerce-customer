import type React from "react"
interface DividerProps {
  text: string
}

const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <div className="mt-6 relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="bg-white px-4 text-gray-500">{text}</span>
      </div>
    </div>
  )
}

export default Divider

