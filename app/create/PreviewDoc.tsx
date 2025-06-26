import {FileTextIcon, UserIcon} from "lucide-react";
import {getFieldsByType} from "@/app/create/formFields";
import PDFPreview from "@/app/create/PDFPreview";
import React from "react";

export default function PreviewDoc({selectedDocType, formData}: { selectedDocType: any, formData?: any }) {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Summary Section */}
                <div className="lg:col-span-1">
                    <h2 className="text-xl font-semibold text-theme-gray-900 mb-4 flex items-center">
                        <UserIcon className="w-6 h-6 text-theme-primary-600 mr-3"/>
                        आवेदन विवरण
                    </h2>

                    {/* Display form summary */}
                    <div className="space-y-3">
                        {selectedDocType && (
                            <div className="flex items-center text-theme-gray-700">
                                <span className="font-medium mr-2">कागजात प्रकार:</span>
                                <span>{selectedDocType.name}</span>
                            </div>
                        )}

                        {/* Display first few fields as summary */}
                        {formData && Object.entries(formData).slice(0, 5).map(([key, value]) => {
                            const field = getFieldsByType(selectedDocType.id).find(f => f.id === key);
                            if (!field) return null;

                            return (
                                <div key={key} className="flex flex-col text-theme-gray-700">
                                    <span className="font-medium">{field.label}:</span>
                                    <span className="text-theme-gray-900">
                                        {field.type === 'select' && field.options
                                            ? field.options.find(opt => opt.value === value)?.label || value
                                            : value}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* PDF Preview Section */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold text-theme-gray-900 mb-4 flex items-center">
                        <FileTextIcon className="w-6 h-6 text-theme-primary-600 mr-3"/>
                        कागजात प्रिभ्यू
                    </h2>
                    {selectedDocType && (
                        <PDFPreview
                            docType={selectedDocType.id}
                            formData={formData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
