import type React from 'react';

interface FormInputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({ id, label, type, placeholder }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
    </div>
  );
};

export default FormInput;
