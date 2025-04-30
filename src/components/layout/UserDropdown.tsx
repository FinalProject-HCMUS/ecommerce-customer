import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { UserCircle, LogOut, User } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../context/store'
import { logout } from '../../context/authSlice'

interface UserDropdownProps {
  onClose?: () => void
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Access userInfo and dispatch from Redux
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)
  const dispatch = useDispatch()

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        if (onClose) onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const handleLogout = () => {
    dispatch(logout())
    setIsDropdownOpen(false)
  }

  return (
    <div className="ml-3 relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
      >
        {userInfo?.photo ? (
          <img
            className="h-8 w-8 rounded-full object-cover border-2 border-transparent hover:border-rose-500 transition-all duration-300"
            src={userInfo.photo || '/placeholder.svg'}
            alt="User"
          />
        ) : (
          <UserCircle className="h-8 w-8 text-gray-700 hover:text-rose-500 transition-colors" />
        )}
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          >
            <div className="py-1">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-medium">
                  {`${userInfo?.firstName || ''} ${userInfo?.lastName || ''}`.trim() || 'Guest'}
                </p>
                <p className="text-gray-500">{userInfo?.email || 'No email available'}</p>
              </div>
            </div>
            <div className="py-1">
              <Link
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
              >
                <User className="mr-3 h-5 w-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
                Profile
              </Link>
            </div>
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 transition-colors"
              >
                <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserDropdown
