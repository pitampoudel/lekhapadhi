import React from 'react';
import { AlignLeftIcon } from 'lucide-react';

interface TextAreaFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  value,
  onChange,
  placeholder = '',
  className = '',
  error = false,
  rows = 4,
}) => {
  return (
    <div className="relative">
      <div className={`flex items-start w-full p-4 bg-theme-white border ${
        error ? 'border-theme-error' : 'border-theme-gray-300'
      } rounded-lg shadow-sm hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-theme-primary-600 focus-within:border-theme-primary-600 transition-all ${className}`}>
        <AlignLeftIcon className="w-5 h-5 text-theme-primary-600 mr-3 mt-1" />
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full border-none focus:outline-none bg-transparent resize-y text-theme-gray-900 placeholder-theme-gray-400"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextAreaField;
