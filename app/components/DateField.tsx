import React from 'react';
import { CalendarIcon } from 'lucide-react';

interface DateFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const DateField: React.FC<DateFieldProps> = ({
  id,
  value,
  onChange,
  placeholder = 'मिति छान्नुहोस्',
  className = '',
  error = false,
}) => {
  // Format the date for display (BS date can be implemented here if needed)
  const formattedDate = value ? new Date(value).toLocaleDateString('ne-NP') : '';

  return (
    <div className="relative">
      <div className={`flex items-center w-full p-4 bg-theme-white border ${
        error ? 'border-theme-error' : 'border-theme-gray-300'
      } rounded-lg shadow-sm hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-theme-primary-600 focus-within:border-theme-primary-600 transition-all ${className}`}>
        <CalendarIcon className="w-5 h-5 text-theme-primary-600 mr-3" />
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border-none focus:outline-none bg-transparent text-theme-gray-900"
          placeholder={placeholder}
        />
      </div>
      {formattedDate && (
        <div className="mt-2 text-sm text-theme-primary-600 font-medium flex items-center">
          <CalendarIcon className="w-4 h-4 mr-1" />
          {formattedDate}
        </div>
      )}
    </div>
  );
};

export default DateField;
