"use client";
import React, {useState} from "react";
import {FileTextIcon, UserIcon} from "lucide-react";
import DocumentTypeSelector from '../components/DocumentTypeSelector';
import SifarisForm from '../components/SifarisForm';
import PDFPreview from '../components/PDFPreview';
import Stepper, {Step} from '../components/Stepper';

export default function CreateTab() {
    const [sifarisType, setSifarisType] = useState('');
    const [formData, setFormData] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(0);

    const steps: Step[] = [
        {
            id: 'select-type',
            title: 'प्रकार छान्नुहोस्',
            description: 'सिफारिसको प्रकार'
        },
        {
            id: 'fill-form',
            title: 'विवरण भर्नुहोस्',
            description: 'आवश्यक जानकारी'
        },
        {
            id: 'preview',
            title: 'प्रिभ्यू',
            description: 'कागजात हेर्नुहोस्'
        }
    ];

    // Handlers for generate functionality
    const handleTypeChange = (type: string) => {
        setSifarisType(type);
        setFormData(null);
        if (type) {
            setCurrentStep(1); // Move to form step when type is selected
        }
    };

    const handleFormSubmit = (data: any) => {
        setFormData(data);
        setCurrentStep(2); // Move to preview step when form is submitted
    };

    const handleStepClick = (stepIndex: number) => {
        // Only allow going back to previous steps
        if (stepIndex < currentStep) {
            setCurrentStep(stepIndex);
        }
    };

    return (
        <div className="bg-theme-card rounded-xl shadow-md p-8 max-w-6xl mx-auto">
            {/* Stepper */}
            <div className="mb-8">
                <Stepper
                    steps={steps}
                    currentStep={currentStep}
                    onStepClick={handleStepClick}
                />
            </div>

            {/* Step-based UI */}
            <div className="mb-10">
                {currentStep === 0 && (
                    <div className="max-w-4xl mx-auto">
                        <DocumentTypeSelector
                            selectedType={sifarisType}
                            onTypeChange={handleTypeChange}
                        />
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="w-full max-w-2xl mx-auto">
                        <div className="bg-theme-card p-6 rounded-xl border border-theme-gray-300 shadow-sm">
                            <h3 className="text-xl font-semibold text-theme-gray-900 mb-6 flex items-center drop-shadow-sm">
                                <UserIcon className="w-6 h-6 text-theme-primary-600 mr-3"/>
                                आवेदन विवरण भर्नुहोस्
                            </h3>
                            <SifarisForm
                                sifarisType={sifarisType}
                                onFormSubmit={handleFormSubmit}
                            />
                        </div>
                    </div>
                )}

                {currentStep === 2 && formData && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Edit Section */}
                        <div
                            className="bg-theme-card p-6 rounded-xl border border-theme-gray-300 h-fit shadow-sm lg:col-span-1">
                            <h3 className="text-xl font-semibold text-theme-gray-900 mb-6 flex items-center drop-shadow-sm">
                                <UserIcon className="w-6 h-6 text-theme-primary-600 mr-3"/>
                                आवेदन विवरण
                            </h3>
                            <div className="mt-4">
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="py-3 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:ring-offset-2 transition-colors w-full"
                                >
                                    फारम सम्पादन गर्नुहोस्
                                </button>
                            </div>
                        </div>

                        {/* PDF Preview Section */}
                        <div
                            className="bg-theme-card p-6 rounded-xl border border-theme-gray-300 lg:col-span-2 shadow-sm">
                            <h3 className="text-xl font-semibold text-theme-gray-900 mb-6 flex items-center drop-shadow-sm">
                                <FileTextIcon className="w-6 h-6 text-theme-primary-600 mr-3"/>
                                कागजात प्रिभ्यू
                            </h3>
                            <PDFPreview
                                docType={sifarisType}
                                formData={formData}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
