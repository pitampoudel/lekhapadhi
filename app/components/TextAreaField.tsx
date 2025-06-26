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
      <div className={`flex items-start w-full p-3 bg-theme-white border ${
        error ? 'border-theme-error' : 'border-theme-gray-300'
      } rounded-md shadow-sm focus-within:ring-2 focus-within:ring-theme-primary focus-within:border-theme-primary transition-colors ${className}`}>
        <AlignLeftIcon className="w-5 h-5 text-theme-gray-600 mr-2 mt-1" />
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full border-none focus:outline-none bg-transparent resize-y"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextAreaField;