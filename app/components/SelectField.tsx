import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, CheckIcon, SearchIcon } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current && options.length > 5) {
      searchInputRef.current.focus();
    }
  }, [isOpen, options.length]);

  const selectedOption = options.find(option => option.value === value);

  // Filter options based on search term
  const filteredOptions = searchTerm 
    ? options.filter(option => 
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-4 flex justify-between items-center text-left bg-theme-card border ${
          error ? 'border-theme-error' : 'border-theme-gray-300'
        } rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:border-theme-primary-600 transition-all ${className}`}
      >
        <span className={`${selectedOption ? 'text-theme-gray-900 font-medium' : 'text-theme-gray-500'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDownIcon className={`w-5 h-5 text-theme-primary-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-theme-card border border-theme-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden flex flex-col">
          {options.length > 5 && (
            <div className="sticky top-0 bg-theme-card p-3 border-b border-theme-gray-200">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-gray-400 w-4 h-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="खोज्नुहोस्..."
                  className="w-full pl-10 pr-4 py-2 border border-theme-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:border-theme-primary-600"
                />
              </div>
            </div>
          )}

          <div className="overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`p-4 cursor-pointer flex items-center justify-between hover:bg-theme-gray-100 transition-colors ${
                    value === option.value 
                      ? 'bg-theme-primary-600 bg-opacity-10 border-l-4 border-theme-primary-600' 
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  <span className={value === option.value ? 'font-medium text-theme-primary-700' : ''}>
                    {option.label}
                  </span>
                  {value === option.value && <CheckIcon className="w-5 h-5 text-theme-primary-600" />}
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-theme-gray-500">
                कुनै परिणाम फेला परेन
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectField;

