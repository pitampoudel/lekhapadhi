import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  id: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  options,
  value,
  onChange,
  placeholder = '-- छान्नुहोस् --',
  className = '',
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 flex justify-between items-center text-left bg-theme-white border ${
          error ? 'border-theme-error' : 'border-theme-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-theme-primary transition-colors ${className}`}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon className={`w-5 h-5 text-theme-gray-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-theme-white border border-theme-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`p-3 cursor-pointer flex items-center justify-between hover:bg-theme-gray-100 ${
                value === option.value ? 'bg-theme-primary-600 text-theme-white' : ''
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <CheckIcon className="w-5 h-5" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectField;