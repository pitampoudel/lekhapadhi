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
      <div className={`flex items-center w-full p-3 bg-theme-white border ${
        error ? 'border-theme-error' : 'border-theme-gray-300'
      } rounded-md shadow-sm focus-within:ring-2 focus-within:ring-theme-primary focus-within:border-theme-primary transition-colors ${className}`}>
        {icon && <div className="mr-2 text-theme-gray-600">{icon}</div>}
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border-none focus:outline-none bg-transparent"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default InputField;