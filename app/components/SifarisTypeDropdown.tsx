import React from 'react';

// Define the Sifaris types
export const sifarisTypes = [
    {
        id: 'citizenship',
        name: 'नागरिकता सिफारिस',
        englishName: 'Citizenship Recommendation'
    },
    {
        id: 'birth',
        name: 'जन्मदर्ता सिफारिस',
        englishName: 'Birth Registration'
    },
    {
        id: 'residence',
        name: 'बसोबास प्रमाण पत्र',
        englishName: 'Residence Certificate'
    },
    {
        id: 'marriage',
        name: 'विवाह प्रमाणिकरण',
        englishName: 'Marriage Verification'
    },
    {
        id: 'relationship',
        name: 'नाता प्रमाणिकरण',
        englishName: 'Relationship Verification'
    }
];

interface SifarisTypeDropdownProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}

const SifarisTypeDropdown: React.FC<SifarisTypeDropdownProps> = ({
                                                                     selectedType,
                                                                     onTypeChange
                                                                 }) => {
    return (
        <div className="mb-6">
            <label htmlFor="sifarisType" className="block text-lg font-medium mb-2">
                सिफारिसको प्रकार छान्नुहोस्
            </label>
            <select
                id="sifarisType"
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="w-full p-3 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
            >
                <option value="">-- सिफारिसको प्रकार छान्नुहोस् --</option>
                {sifarisTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                        {type.name} ({type.englishName})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SifarisTypeDropdown;
