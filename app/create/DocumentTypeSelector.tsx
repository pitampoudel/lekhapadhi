import React from "react";
import {CheckCircleIcon, FileTextIcon} from "lucide-react";
import {docTypes} from "@/app/config/docTypes";

interface DocumentTypeSelectorProps {
    selectedType: string;
    onTypeChange: (type: string) => void;
}


const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({selectedType, onTypeChange}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {docTypes.map((type) => (
                <div
                    key={type.id}
                    onClick={() => onTypeChange(type.id)}
                    className={`
              relative p-5 rounded-lg border-2 cursor-pointer transition-all transform hover:scale-105
              ${
                        selectedType === type.id
                            ? "border-theme-primary-600 bg-theme-primary-600 bg-opacity-5 shadow-md"
                            : "border-theme-gray-300 hover:border-theme-primary-400 hover:bg-theme-gray-50"
                    }
            `}
                >
                    {selectedType === type.id && (
                        <CheckCircleIcon className="absolute top-3 right-3 w-5 h-5 text-theme-primary-600"/>
                    )}
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-theme-primary-600 bg-opacity-10 p-3 rounded-full mb-3">
                            <FileTextIcon className="w-6 h-6 text-theme-primary-600"/>
                        </div>
                        <h4 className="text-lg font-medium text-theme-gray-900 mb-1">
                            {type.name}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DocumentTypeSelector;