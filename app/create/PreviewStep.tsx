import React from 'react';
import { CheckIcon, FileTextIcon } from 'lucide-react';
import { FormField } from "../config/formFields";

interface PreviewStepProps {
  docTypeId: string;
  selectedDocType: { id: string; name: string } | undefined;
  formData: Record<string, string>;
  getFieldsByType: (docTypeId: string) => FormField[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const PreviewStep: React.FC<PreviewStepProps> = ({
  docTypeId,
  selectedDocType,
  formData,
  getFieldsByType,
  onBack,
  onSubmit,
  isSubmitting
}) => {
  return (
    <div className="w-full max-w-3xl">
      <div className="bg-card shadow-lg rounded-lg overflow-hidden border border-border">
        <div className="p-6 bg-theme-primary-600 text-white">
          <h2 className="text-xl font-semibold flex items-center">
            <FileTextIcon className="w-6 h-6 mr-3" />
            {selectedDocType ? selectedDocType.name : 'कागजात'} - प्रिभ्यू
          </h2>
          <p className="mt-1 text-theme-primary-100">
            कृपया तपाईंको विवरण जाँच गर्नुहोस् र पुष्टि गर्नुहोस्
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getFieldsByType(docTypeId).map((field: FormField) => (
              <div key={field.id} className="border-b border-border pb-3">
                <p className="text-sm text-muted-foreground mb-1">{field.label}</p>
                <p className="font-medium text-foreground">
                  {formData[field.id] || '-'}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-md shadow-sm text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary-500 transition-colors"
            >
              फिर्ता जानुहोस्
            </button>

            <button
              type="button"
              onClick={onSubmit}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-theme-primary-600 hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary-500 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>कागजात सिर्जना गर्दै...</>
              ) : (
                <>
                  <CheckIcon className="w-5 h-5 mr-2" />
                  कागजात सिर्जना गर्नुहोस्
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;