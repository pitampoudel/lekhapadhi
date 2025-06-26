"use client";
import React, {useCallback, useState} from "react";
import {UserIcon} from "lucide-react";
import DocumentTypeSelector, {types} from './DocumentTypeSelector';
import DynamicForm from './DynamicForm';
import Stepper, {Step} from '../components/input/Stepper';
import {getFieldsByType} from "./formFields";
import PreviewDoc from "@/app/create/PreviewDoc";

export type CreateDocFormData = Record<string, string | number>;

export default function CreatePage() {
    const [docType, setDocType] = useState<string>('');
    const [formData, setFormData] = useState<CreateDocFormData | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    // Define steps for the form process
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

    // Get the selected document type details
    const selectedDocType = types.find(typ => typ.id === docType);

    // Handler for document type selection
    const handleTypeChange = useCallback((type: string) => {
        setDocType(type);
        setFormData(null);
        setFormErrors([]);
        if (type) {
            setCurrentStep(1); // Move to form step when type is selected
        }
    }, []);

    // Handler for form submission
    const handleFormSubmit = useCallback((data: CreateDocFormData) => {
        setIsSubmitting(true);
        setFormErrors([]);

        try {
            // Validate required fields
            const fields = getFieldsByType(docType);
            const requiredFields = fields.filter(field => field.required);
            const missingFields = requiredFields.filter(field => !data[field.id]);

            if (missingFields.length > 0) {
                setFormErrors(missingFields.map(field => `${field.label} आवश्यक छ`));
                setIsSubmitting(false);
                return;
            }

            setFormData(data);
            setCurrentStep(2); // Move to preview step when form is submitted
        } catch (error) {
            console.error('Form submission error:', error);
            setFormErrors(['फारम पेश गर्दा त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस्।']);
        } finally {
            setIsSubmitting(false);
        }
    }, [docType]);

    // Handler for step navigation
    const handleStepClick = useCallback((stepIndex: number) => {
        // Only allow going back to previous steps or to the next step if current step is complete
        if (stepIndex < currentStep ||
            (stepIndex === currentStep + 1 &&
                ((currentStep === 0 && docType) ||
                    (currentStep === 1 && formData)))) {
            setCurrentStep(stepIndex);
        }
    }, [currentStep, docType, formData]);


    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8">
            <div className="w-full max-w-4xl">
                <h1 className="text-2xl md:text-3xl font-bold text-theme-gray-900 mb-6 text-center">
                    कागजात सिर्जना गर्नुहोस्
                </h1>

                {/* Stepper */}
                <div className="mb-10" role="navigation" aria-label="Form steps">
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                        onStepClick={handleStepClick}
                    />
                </div>

                {/* Form errors */}
                {formErrors.length > 0 && (
                    <div className="mb-6 p-4 bg-theme-error bg-opacity-10 border border-theme-error rounded-lg"
                         role="alert">
                        <h4 className="font-semibold text-theme-error mb-2">कृपया निम्न त्रुटिहरू सच्याउनुहोस्:</h4>
                        <ul className="list-disc pl-5">
                            {formErrors.map((error, index) => (
                                <li key={index} className="text-theme-error">{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Step-based UI */}
                <div className="w-full flex justify-center mt-2">
                    {/* Step 1: Document Type Selection */}
                    {currentStep === 0 && (
                        <div className="w-full">
                            <DocumentTypeSelector
                                selectedType={docType}
                                onTypeChange={handleTypeChange}
                            />
                        </div>
                    )}

                    {/* Step 2: Form Filling */}
                    {currentStep === 1 && (
                        <div className="w-full max-w-2xl">
                            <h2 className="text-xl font-semibold text-theme-gray-900 mb-6 flex items-center">
                                <UserIcon className="w-6 h-6 text-theme-primary-600 mr-3"/>
                                {selectedDocType ? `${selectedDocType.name} - आवेदन विवरण` : 'आवेदन विवरण भर्नुहोस्'}
                            </h2>
                            <DynamicForm
                                type={docType}
                                onFormSubmit={handleFormSubmit}
                                isSubmitting={isSubmitting}
                                initialData={formData}
                            />
                        </div>
                    )}

                    {/* Step 3: Preview */}
                    {currentStep === 2 && formData && (
                        <div className="w-full">
                            <PreviewDoc
                                selectedDocType={selectedDocType}
                                formData={formData}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
