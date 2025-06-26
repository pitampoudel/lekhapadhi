import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField, getFieldsByType } from "./formFields";
import SelectField from "./SelectField";
import DateField from "./DateField";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import { UserIcon, HomeIcon, CalendarIcon, Users2Icon } from "lucide-react";

interface SifarisFormProps {
  sifarisType: string;
  onFormSubmit: (data: any) => void;
}

const SifarisForm: React.FC<SifarisFormProps> = ({
  sifarisType,
  onFormSubmit,
}) => {
  // Get fields based on selected Sifaris type
  const fields = getFieldsByType(sifarisType);

  // Create validation schema dynamically based on fields
  const createValidationSchema = (fields: FormField[]) => {
    const schemaFields: { [key: string]: any } = {};

    fields.forEach((field) => {
      if (field.required) {
        switch (field.type) {
          case "text":
          case "textarea":
            schemaFields[field.id] = yup
              .string()
              .required(`${field.label} आवश्यक छ`);
            break;
          case "number":
            schemaFields[field.id] = yup
              .number()
              .required(`${field.label} आवश्यक छ`);
            break;
          case "date":
            schemaFields[field.id] = yup
              .string()
              .required(`${field.label} आवश्यक छ`);
            break;
          case "select":
            schemaFields[field.id] = yup
              .string()
              .required(`${field.label} आवश्यक छ`);
            break;
          default:
            schemaFields[field.id] = yup
              .string()
              .required(`${field.label} आवश्यक छ`);
        }
      }
    });

    return yup.object().shape(schemaFields);
  };

  const validationSchema = createValidationSchema(fields);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    onFormSubmit(data);
  };

  // Get appropriate icon for field
  const getFieldIcon = (field: FormField) => {
    const fieldId = field.id.toLowerCase();
    if (fieldId.includes('name')) return <UserIcon />;
    if (fieldId.includes('address')) return <HomeIcon />;
    if (fieldId.includes('date')) return <CalendarIcon />;
    if (fieldId.includes('relation')) return <Users2Icon />;
    return null;
  };

  // Render form fields based on field type
  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id];

    switch (field.type) {
      case "text":
      case "number":
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                id={field.id}
                type={field.type as 'text' | 'number'}
                value={value || ''}
                onChange={onChange}
                placeholder={field.placeholder}
                error={hasError}
                icon={getFieldIcon(field)}
              />
            )}
          />
        );
      case "date":
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateField
                id={field.id}
                value={value || ''}
                onChange={onChange}
                error={hasError}
              />
            )}
          />
        );
      case "textarea":
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextAreaField
                id={field.id}
                value={value || ''}
                onChange={onChange}
                placeholder={field.placeholder}
                error={hasError}
              />
            )}
          />
        );
      case "select":
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <SelectField
                id={field.id}
                options={field.options || []}
                value={value || ''}
                onChange={onChange}
                error={hasError}
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  if (!sifarisType) {
    return (
      <div className="p-6 bg-theme-gray-100 rounded-md shadow-sm">
        <p className="text-center text-lg text-theme-gray-600">कृपया सिफारिसको प्रकार छान्नुहोस्</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {fields.map((field) => (
          <div 
            key={field.id} 
            className={`mb-4 ${
              field.type === 'textarea' ? 'md:col-span-2' : ''
            }`}
          >
            <label 
              htmlFor={field.id} 
              className="block text-lg font-medium mb-3 text-theme-gray-800 flex items-center"
            >
              {getFieldIcon(field) && (
                <span className="mr-2 text-theme-primary-600">{getFieldIcon(field)}</span>
              )}
              {field.label}{" "}
              {field.required && <span className="text-theme-error ml-1">*</span>}
            </label>
            <div className="transition-all duration-200 hover:shadow-md focus-within:shadow-md rounded-lg">
              {renderField(field)}
            </div>
            {errors[field.id] && (
              <p className="mt-2 text-theme-error text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {(errors[field.id]?.message as string) || "यो फिल्ड आवश्यक छ"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className="w-full py-4 px-6 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-light font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:ring-offset-2 transition-all hover:scale-105 transform"
        >
          सिफारिस तयार गर्नुहोस्
        </button>
      </div>
    </form>
  );
};

export default SifarisForm;

