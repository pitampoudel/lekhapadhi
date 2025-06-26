"use client";
import React, { useState } from "react";
import { FileTextIcon } from "lucide-react";
import SifarisTypeDropdown from './SifarisTypeDropdown';
import SifarisForm from './SifarisForm';
import PDFPreview from './PDFPreview';

export default function CreateTab() {
    // State for generate functionality
    const [sifarisType, setSifarisType] = useState('');
    const [formData, setFormData] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);

    // Handlers for generate functionality
    const handleTypeChange = (type: string) => {
        setSifarisType(type);
        setFormData(null);
        setShowPreview(false);
    };

    const handleFormSubmit = (data: any) => {
        setFormData(data);
        setShowPreview(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <FileTextIcon className="w-6 h-6 text-blue-600"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">सिफारिस पत्र तयार गर्नुहोस्</h2>
            </div>

            <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Document Type</label>
                <SifarisTypeDropdown
                    selectedType={sifarisType}
                    onTypeChange={handleTypeChange}
                />
            </div>

            {sifarisType && !showPreview && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Fill Application Details</h3>
                    <SifarisForm
                        sifarisType={sifarisType}
                        onFormSubmit={handleFormSubmit}
                    />
                </div>
            )}

            {showPreview && formData && (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-800">Document Preview</h3>
                        <button
                            onClick={() => setShowPreview(false)}
                            className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        >
                            फारम सम्पादन गर्नुहोस्
                        </button>
                    </div>

                    <PDFPreview
                        sifarisType={sifarisType}
                        formData={formData}
                    />
                </div>
            )}
        </div>
    );
}