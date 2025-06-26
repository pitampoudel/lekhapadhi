import React from 'react';

interface InputFieldProps {
  id: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  icon?: React.ReactNode;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder = '',
  className = '',
  error = false,
  icon,
}) => {
  return (
    <div className="relative">
      <div className={`flex items-center w-full p-4 bg-theme-card border ${
        error ? 'border-theme-error' : 'border-theme-gray-300'
      } rounded-lg shadow-sm hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-theme-primary-600 focus-within:border-theme-primary-600 transition-all ${className}`}>
        {icon && <div className="mr-3 text-theme-primary-600">{icon}</div>}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border-none focus:outline-none bg-transparent text-theme-gray-900 placeholder-theme-gray-400"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;

