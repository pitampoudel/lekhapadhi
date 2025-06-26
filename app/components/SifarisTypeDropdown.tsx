import React from "react";
import SelectField from "./SelectField";
import { FileTextIcon } from "lucide-react";

// Define the Sifaris types
export const sifarisTypes = [
  {
    id: "citizenship",
    name: "नागरिकता सिफारिस",
    englishName: "Citizenship Recommendation",
  },
  {
    id: "birth",
    name: "जन्मदर्ता सिफारिस",
    englishName: "Birth Registration",
  },
  {
    id: "residence",
    name: "बसोबास प्रमाण पत्र",
    englishName: "Residence Certificate",
  },
  {
    id: "marriage",
    name: "विवाह प्रमाणिकरण",
    englishName: "Marriage Verification",
  },
  {
    id: "relationship",
    name: "नाता प्रमाणिकरण",
    englishName: "Relationship Verification",
  },
];

interface SifarisTypeDropdownProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const SifarisTypeDropdown: React.FC<SifarisTypeDropdownProps> = ({
  selectedType,
  onTypeChange,
}) => {
  // Convert sifarisTypes to options format for SelectField
  const options = sifarisTypes.map(type => ({
    value: type.id,
    label: `${type.name} (${type.englishName})`
  }));

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <FileTextIcon className="w-5 h-5 text-theme-primary-600 mr-2" />
        <label htmlFor="sifarisType" className="block text-lg font-medium text-theme-gray-800">
          सिफारिसको प्रकार छान्नुहोस्
        </label>
      </div>
      <SelectField
        id="sifarisType"
        options={options}
        value={selectedType}
        onChange={onTypeChange}
        placeholder="-- सिफारिसको प्रकार छान्नुहोस् --"
        className="bg-theme-card"
      />
    </div>
  );
};

export default SifarisTypeDropdown;

