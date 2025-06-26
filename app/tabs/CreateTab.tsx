"use client";
import React, { useState } from "react";
import { FileTextIcon, UserIcon, ArrowLeftIcon } from "lucide-react";
import DocumentTypeSelector from '../components/DocumentTypeSelector';
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
        <div className="bg-theme-white rounded-xl shadow-md p-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-center mb-10">
                <div className="bg-theme-primary-600 bg-opacity-10 p-4 rounded-full mr-4">
                    <FileTextIcon className="w-7 h-7 text-theme-primary-600"/>
                </div>
                <h2 className="text-3xl font-extrabold text-theme-gray-900 drop-shadow-sm">सिफारिस पत्र तयार गर्नुहोस्</h2>
            </div>

            {/* Step-based UI */}
            <div className="mb-10">
                {sifarisType && !showPreview && (
                    <button 
                        onClick={() => handleTypeChange('')}
                        className="flex items-center text-theme-primary-600 hover:text-theme-primary-800 mb-6 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        <span>फिर्ता जानुहोस्</span>
                    </button>
                )}

                {!sifarisType ? (
                    <div className="max-w-4xl mx-auto">
                        <DocumentTypeSelector
                            selectedType={sifarisType}
                            onTypeChange={handleTypeChange}
                        />
                    </div>
                ) : (
                    <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-3 gap-8' : 'grid-cols-1'}`}>
                        {/* Form Section */}
                        <div className={`bg-theme-white p-6 rounded-xl border border-theme-gray-300 h-fit shadow-sm ${showPreview ? 'lg:col-span-1' : 'w-full max-w-2xl mx-auto'}`}>
                            <h3 className="text-xl font-semibold text-theme-gray-900 mb-6 flex items-center drop-shadow-sm">
                                <UserIcon className="w-6 h-6 text-theme-primary-600 mr-3" />
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
                                        className="py-3 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:ring-offset-2 transition-colors w-full"
                                    >
                                        फारम सम्पादन गर्नुहोस्
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* PDF Preview Section */}
                        {showPreview && formData && (
                            <div className="bg-theme-white p-6 rounded-xl border border-theme-gray-300 lg:col-span-2 shadow-sm">
                                <h3 className="text-xl font-semibold text-theme-gray-900 mb-6 flex items-center drop-shadow-sm">
                                    <FileTextIcon className="w-6 h-6 text-theme-primary-600 mr-3" />
                                    कागजात प्रिभ्यू
                                </h3>
                                <PDFPreview
                                    sifarisType={sifarisType}
                                    formData={formData}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
