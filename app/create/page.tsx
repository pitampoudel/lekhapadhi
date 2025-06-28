"use client";
import React, {useCallback, useState} from "react";
import {XIcon} from "lucide-react";
import DocumentTypeSelector from './DocumentTypeSelector';
import Stepper, {Step} from '../components/input/Stepper';
import {getFieldsByType} from "../config/formFields";
import {useRouter} from "next/navigation";
import {docTypes} from "@/app/config/docTypes";
import {FormData} from "@/lib/types/formData";
import FormStep from "./FormStep";
import PreviewStep from "./PreviewStep";
import FileUploadStep from "./FileUploadStep";
import ModeSelector from "./ModeSelector";


export default function CreateDocPage() {
    const router = useRouter();
    const [creationMode, setCreationMode] = useState<'template' | 'upload' | ''>('');
    const [docTypeId, setDocTypeId] = useState<string>('');
    const [formData, setFormData] = useState<FormData | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formErrors, setFormErrors] = useState<string[]>([]);
    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const handleClose = () => {
        router.push('/');
    };

    // Define steps for the form process
    const steps: Step[] = [
        {
            id: 'select-mode',
            title: 'Creation Mode',
            description: 'Choose how to create'
        },
        ...(creationMode === 'template' ? [
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
        ] : creationMode === 'upload' ? [
            {
                id: 'upload-file',
                title: 'Upload Document',
                description: 'Upload your file'
            }
        ] : [])
    ];

    // Get the selected document type details
    const selectedDocType = docTypes.find(typ => typ.id === docTypeId);

    // Handler for creation mode selection
    const handleModeChange = useCallback((mode: 'template' | 'upload') => {
        setCreationMode(mode);
        setDocTypeId('');
        setFormData(null);
        setFormErrors([]);
        setCurrentStep(1); // Move to next step when mode is selected
    }, []);

    // Handler for document type selection
    const handleTypeChange = useCallback((type: string) => {
        setDocTypeId(type);
        setFormData(null);
        setFormErrors([]);
        if (type) {
            setCurrentStep(2); // Move to form step when type is selected (step 2 in template mode)
        }
    }, []);

    // Handler for upload success
    const handleUploadSuccess = useCallback(() => {
        // Redirect to the uploaded document or back to dashboard
        router.push('/');
    }, [router]);

    // Handler for form field changes
    const handleFieldChange = useCallback((id: string, value: string) => {
        setFormValues(prev => ({
            ...prev,
            [id]: value
        }));
    }, []);

    // Handler for form submission
    const handleFormSubmit = useCallback((data: Record<string, string>) => {
        setIsSubmitting(true);
        setFormErrors([]);

        try {
            // Validate required fields
            const fields = getFieldsByType(docTypeId);
            const requiredFields = fields.filter(field => field.required);
            const missingFields = requiredFields.filter(field => {
                return !(field.id in data && data[field.id]);
            });

            if (missingFields.length > 0) {
                setFormErrors(missingFields.map(field => `${field.label} आवश्यक छ`));
                setIsSubmitting(false);
                return;
            }

            // Convert Record<string, string> to FormData
            setFormData(data as unknown as FormData);
            setCurrentStep(3); // Move to preview step when form is submitted (step 3 in template mode)
        } catch (error) {
            console.error('Form submission error:', error);
            setFormErrors(['फारम पेश गर्दा त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस्।']);
        } finally {
            setIsSubmitting(false);
        }
    }, [docTypeId]);

    // Handler for step navigation
    const handleStepClick = useCallback((stepIndex: number) => {
        // Only allow going back to previous steps or to the next step if current step is complete
        if (stepIndex < currentStep ||
            (stepIndex === currentStep + 1 &&
                ((currentStep === 0 && creationMode) ||
                    (currentStep === 1 && creationMode === 'template' && docTypeId) ||
                    (currentStep === 2 && creationMode === 'template' && formData)))) {
            setCurrentStep(stepIndex);
        }
    }, [currentStep, creationMode, docTypeId, formData]);


    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 md:p-8 relative">
            <button
                onClick={handleClose}
                className="fixed top-4 right-4 p-2 rounded-full text-theme-gray-700 hover:text-theme-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-theme-primary-600 cursor-pointer z-20"
                aria-label="Close form"
            >
                <XIcon className="w-6 h-6"/>
            </button>

            <div className="w-full max-w-4xl">
                {/* Stepper */}
                <div className="fixed top-0 left-0 right-0 bg-theme-content z-10 pt-6 pb-16 shadow-md" role="navigation"
                     aria-label="Form steps">
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                        onStepClick={handleStepClick}
                    />
                </div>
                {/* Spacer to prevent content from being hidden behind fixed stepper */}
                <div className="mb-40"></div>

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
                    {/* Step 0: Mode Selection */}
                    {currentStep === 0 && (
                        <div className="w-full">
                            <ModeSelector onModeSelect={handleModeChange}/>
                        </div>
                    )}

                    {/* Template Creation Workflow */}
                    {creationMode === 'template' && (
                        <>
                            {/* Step 1: Document Type Selection */}
                            {currentStep === 1 && (
                                <div className="w-full">
                                    <DocumentTypeSelector
                                        selectedType={docTypeId}
                                        onTypeChange={handleTypeChange}
                                    />
                                </div>
                            )}

                            {/* Step 2: Form Filling */}
                            {currentStep === 2 && (
                                <FormStep
                                    docTypeId={docTypeId}
                                    selectedDocType={selectedDocType}
                                    formValues={formValues}
                                    handleFieldChange={handleFieldChange}
                                    handleFormSubmit={handleFormSubmit}
                                    getFieldsByType={getFieldsByType}
                                    formErrors={formErrors}
                                    isSubmitting={isSubmitting}
                                />
                            )}

                            {/* Step 3: Preview */}
                            {currentStep === 3 && formData && (
                                <PreviewStep
                                    docTypeId={docTypeId}
                                    selectedDocType={selectedDocType}
                                    formData={formData as unknown as Record<string, string>}
                                    getFieldsByType={getFieldsByType}
                                    onBack={() => setCurrentStep(2)}
                                    onSubmit={async () => {
                                        setIsSubmitting(true);
                                        try {
                                            const response = await fetch('/api/documents', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    docType: docTypeId,
                                                    formData
                                                }),
                                            });

                                            if (!response.ok) {
                                                throw new Error('Failed to create document');
                                            }

                                            const result = await response.json();
                                            router.push(result.publicUrl);
                                            router.push("/");
                                        } catch (error) {
                                            console.error('Error creating document:', error);
                                            setFormErrors(['कागजात सिर्जना गर्दा त्रुटि भयो। कृपया पुन: प्रयास गर्नुहोस्।']);
                                            setCurrentStep(2);
                                        } finally {
                                            setIsSubmitting(false);
                                        }
                                    }}
                                    isSubmitting={isSubmitting}
                                />
                            )}
                        </>
                    )}

                    {/* File Upload Workflow */}
                    {creationMode === 'upload' && currentStep === 1 && (
                        <FileUploadStep
                            onUploadSuccess={handleUploadSuccess}
                            onBack={() => setCurrentStep(0)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
