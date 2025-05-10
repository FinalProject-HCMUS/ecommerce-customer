import type React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={`w-full rounded-[10px] border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default InputField;
