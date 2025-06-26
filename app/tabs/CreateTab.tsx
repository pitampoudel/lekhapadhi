"use client";
import React, { useState } from "react";
import { FileTextIcon, UserIcon } from "lucide-react";
import SifarisTypeDropdown from '../components/SifarisTypeDropdown';
import SifarisForm from '../components/SifarisForm';
import PDFPreview from '../components/PDFPreview';

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
        <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-8">
                <div className="bg-theme-primary-600 bg-opacity-10 p-3 rounded-full mr-3">
                    <FileTextIcon className="w-6 h-6 text-theme-primary-600"/>
                </div>
                <h2 className="text-2xl font-bold text-theme-gray-800">सिफारिस पत्र तयार गर्नुहोस्</h2>
            </div>

            <div className="mb-8 max-w-3xl mx-auto">
                <SifarisTypeDropdown
                    selectedType={sifarisType}
                    onTypeChange={handleTypeChange}
                />
            </div>

            <div className={`grid ${showPreview ? 'grid-cols-1 md:grid-cols-3 gap-8' : 'grid-cols-1'}`}>
                {/* Form Section */}
                {sifarisType && (
                    <div className={`bg-theme-gray-50 p-6 rounded-lg border border-theme-gray-300 h-fit shadow-sm ${showPreview ? 'md:col-span-1' : 'w-full max-w-2xl mx-auto'}`}>
                        <h3 className="text-lg font-medium text-theme-gray-800 mb-4 flex items-center">
                            <UserIcon className="w-5 h-5 text-theme-primary-600 mr-2" />
                            आवेदन विवरण भर्नुहोस्
                        </h3>
                        {!showPreview ? (
                            <SifarisForm
                                sifarisType={sifarisType}
                                onFormSubmit={handleFormSubmit}
                            />
                        ) : (
                            <div className="mt-4">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="py-2 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-colors w-full"
                                >
                                    फारम सम्पादन गर्नुहोस्
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* PDF Preview Section */}
                {showPreview && formData && (
                    <div className="bg-theme-gray-50 p-6 rounded-lg border border-theme-gray-300 md:col-span-2 shadow-sm">
                        <h3 className="text-lg font-medium text-theme-gray-800 mb-4 flex items-center">
                            <FileTextIcon className="w-5 h-5 text-theme-primary-600 mr-2" />
                            कागजात प्रिभ्यू
                        </h3>
                        <PDFPreview
                            sifarisType={sifarisType}
                            formData={formData}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
