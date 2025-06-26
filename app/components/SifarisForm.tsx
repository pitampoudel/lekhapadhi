import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormField, getFieldsByType } from './formFields';

interface SifarisFormProps {
  sifarisType: string;
  onFormSubmit: (data: any) => void;
}

const SifarisForm: React.FC<SifarisFormProps> = ({ sifarisType, onFormSubmit }) => {
  // Get fields based on selected Sifaris type
  const fields = getFieldsByType(sifarisType);

  // Create validation schema dynamically based on fields
  const createValidationSchema = (fields: FormField[]) => {
    const schemaFields: { [key: string]: any } = {};

    fields.forEach(field => {
      if (field.required) {
        switch (field.type) {
          case 'text':
          case 'textarea':
            schemaFields[field.id] = yup.string().required(`${field.label} आवश्यक छ`);
            break;
          case 'number':
            schemaFields[field.id] = yup.number().required(`${field.label} आवश्यक छ`);
            break;
          case 'date':
            schemaFields[field.id] = yup.string().required(`${field.label} आवश्यक छ`);
            break;
          case 'select':
            schemaFields[field.id] = yup.string().required(`${field.label} आवश्यक छ`);
            break;
          default:
            schemaFields[field.id] = yup.string().required(`${field.label} आवश्यक छ`);
        }
      }
    });

    return yup.object().shape(schemaFields);
  };

  const validationSchema = createValidationSchema(fields);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = (data: any) => {
    onFormSubmit(data);
  };

  // Render form fields based on field type
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <input
            type={field.type}
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id)}
            className="w-full p-3 border border-theme-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
          />
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            placeholder={field.placeholder}
            {...register(field.id)}
            rows={4}
            className="w-full p-3 border border-theme-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            {...register(field.id)}
            className="w-full p-3 border border-theme-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-theme-primary"
          >
            <option value="">-- छान्नुहोस् --</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  if (!sifarisType) {
    return (
      <div className="p-6 bg-theme-gray-100 rounded-md">
        <p className="text-center text-lg">कृपया सिफारिसको प्रकार छान्नुहोस्</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map(field => (
        <div key={field.id} className="mb-4">
          <label htmlFor={field.id} className="block text-lg font-medium mb-2">
            {field.label} {field.required && <span className="text-theme-error">*</span>}
          </label>
          {renderField(field)}
          {errors[field.id] && (
            <p className="mt-1 text-theme-error">{(errors[field.id]?.message as string) || 'यो फिल्ड आवश्यक छ'}</p>
          )}
        </div>
      ))}
      <div className="mt-8">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2"
        >
          सिफारिस तयार गर्नुहोस्
        </button>
      </div>
    </form>
  );
};

export default SifarisForm;
