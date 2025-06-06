import type React from 'react';

import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { t } from '../../../helpers/i18n';
import { Link } from 'react-router-dom';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  forgotPasswordLink?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  forgotPasswordLink,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {forgotPasswordLink && (
          <Link
            to={forgotPasswordLink}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            {t('hyperlink.forgotPassword')}
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          className={`w-full rounded-[10px] border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
