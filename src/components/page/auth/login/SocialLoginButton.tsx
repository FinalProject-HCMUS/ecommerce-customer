import type React from 'react'

interface SocialLoginButtonProps {
  icon: React.ReactNode
  text: string
  onClick: () => void
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ icon, text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-[10px] border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {icon}
      {text}
    </button>
  )
}

export default SocialLoginButton
