import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField, getFieldsByType } from "./formFields";
import SelectField from "../components/input/SelectField";
import DateField from "../components/input/DateField";
import InputField from "../components/input/InputField";
import TextAreaField from "../components/input/TextAreaField";
import { UserIcon, HomeIcon, CalendarIcon, Users2Icon, Loader2Icon, AlertCircleIcon } from "lucide-react";
import { CreateDocFormData } from "./page";

interface DynamicFormProps {
  type: string;
  onFormSubmit: (data: CreateDocFormData) => void;
  isSubmitting?: boolean;
  initialData?: CreateDocFormData | null;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  type,
  onFormSubmit,
  isSubmitting = false,
  initialData = null,
}) => {
  const fields = getFieldsByType(type);

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
              .typeError(`${field.label} संख्या हुनुपर्छ`)
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
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateDocFormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: initialData || undefined,
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = (data: CreateDocFormData) => {
    onFormSubmit(data);
  };

  // Get appropriate icon for field
  const getFieldIcon = (field: FormField) => {
    const fieldId = field.id.toLowerCase();
    if (fieldId.includes('name')) return <UserIcon className="w-5 h-5" />;
    if (fieldId.includes('address')) return <HomeIcon className="w-5 h-5" />;
    if (fieldId.includes('date')) return <CalendarIcon className="w-5 h-5" />;
    if (fieldId.includes('relation')) return <Users2Icon className="w-5 h-5" />;
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

  if (!type) {
    return (
      <div className="p-4">
        <p className="text-center text-lg text-theme-gray-600">कृपया सिफारिसको प्रकार छान्नुहोस्</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Form instructions */}
      <div className="mb-6">
        <p className="text-theme-primary-700 text-sm flex items-center">
          <AlertCircleIcon className="w-4 h-4 mr-2" />
          तारा (*) चिन्ह भएका फिल्डहरू अनिवार्य छन्। कृपया सबै आवश्यक जानकारी भर्नुहोस्।
        </p>
      </div>

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
              <p className="mt-2 text-theme-error text-sm flex items-center" role="alert">
                <AlertCircleIcon className="h-4 w-4 mr-1" />
                {(errors[field.id]?.message as string) || "यो फिल्ड आवश्यक छ"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:ring-offset-2 transition-all ${
            isSubmitting 
              ? 'bg-theme-primary-400 text-white cursor-not-allowed' 
              : 'bg-theme-primary-600 hover:bg-theme-primary-700 text-white hover:translate-y-[-2px]'
          }`}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <Loader2Icon className="animate-spin w-5 h-5 mr-2" />
              प्रक्रिया हुँदैछ...
            </span>
          ) : (
            'सिफारिस तयार गर्नुहोस्'
          )}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
