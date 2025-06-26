import React from 'react';
import { SaveIcon, UserIcon } from 'lucide-react';
import { FormField } from "../config/formFields";
import InputField from "../components/input/InputField";
import DateField from "../components/input/DateField";
import TextAreaField from "../components/input/TextAreaField";
import SelectField from "../components/input/SelectField";

interface FormStepProps {
  docTypeId: string;
  selectedDocType: { id: string; name: string } | undefined;
  formValues: Record<string, string>;
  handleFieldChange: (id: string, value: string) => void;
  handleFormSubmit: (data: Record<string, string>) => void;
  getFieldsByType: (docTypeId: string) => FormField[];
  formErrors: string[];
  isSubmitting: boolean;
}

const FormStep: React.FC<FormStepProps> = ({
  docTypeId,
  selectedDocType,
  formValues,
  handleFieldChange,
  handleFormSubmit,
  getFieldsByType,
  formErrors,
  isSubmitting
}) => {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
        <UserIcon className="w-6 h-6 text-theme-primary-600 mr-3" />
        {selectedDocType ? `${selectedDocType.name} - आवेदन विवरण` : 'आवेदन विवरण भर्नुहोस्'}
      </h2>

      {docTypeId && (
        <form onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(formValues);
        }}>
          <div className="space-y-6">
            {getFieldsByType(docTypeId).map((field: FormField) => (
              <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium text-muted-foreground mb-2">
                  {field.label} {field.required && <span className="text-theme-error">*</span>}
                </label>

                {field.type === 'text' && (
                  <InputField
                    id={field.id}
                    type="text"
                    value={formValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    error={formErrors.some(error => error.includes(field.label))}
                  />
                )}

                {field.type === 'number' && (
                  <InputField
                    id={field.id}
                    type="number"
                    value={formValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    error={formErrors.some(error => error.includes(field.label))}
                  />
                )}

                {field.type === 'date' && (
                  <DateField
                    id={field.id}
                    value={formValues[field.id] || ''}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    error={formErrors.some(error => error.includes(field.label))}
                  />
                )}

                {field.type === 'textarea' && (
                  <TextAreaField
                    id={field.id}
                    value={formValues[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    error={formErrors.some(error => error.includes(field.label))}
                  />
                )}

                {field.type === 'select' && field.options && (
                  <SelectField
                    id={field.id}
                    value={formValues[field.id] || ''}
                    onChange={(value) => handleFieldChange(field.id, value)}
                    options={field.options}
                    error={formErrors.some(error => error.includes(field.label))}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-theme-primary-600 hover:bg-theme-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-primary-500 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>प्रक्रियामा छ...</>
              ) : (
                <>
                  <SaveIcon className="w-5 h-5 mr-2" />
                  फारम पेश गर्नुहोस्
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FormStep;