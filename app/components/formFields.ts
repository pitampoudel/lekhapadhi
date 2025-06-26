// Define form field types
export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

// Common fields for all Sifaris types
export const commonFields: FormField[] = [
  {
    id: 'fullName',
    label: 'पूरा नाम',
    type: 'text',
    placeholder: 'पूरा नाम लेख्नुहोस्',
    required: true
  },
  {
    id: 'fatherName',
    label: 'बुवाको नाम',
    type: 'text',
    placeholder: 'बुवाको नाम लेख्नुहोस्',
    required: true
  },
  {
    id: 'motherName',
    label: 'आमाको नाम',
    type: 'text',
    placeholder: 'आमाको नाम लेख्नुहोस्',
    required: true
  },
  {
    id: 'permanentAddress',
    label: 'स्थायी ठेगाना',
    type: 'text',
    placeholder: 'स्थायी ठेगाना लेख्नुहोस्',
    required: true
  },
  {
    id: 'wardNo',
    label: 'वडा नं',
    type: 'number',
    placeholder: 'वडा नं लेख्नुहोस्',
    required: true
  },
  {
    id: 'reason',
    label: 'सिफारिसको कारण',
    type: 'textarea',
    placeholder: 'सिफारिसको कारण लेख्नुहोस्',
    required: true
  }
];

// Specific fields for each Sifaris type
export const citizenshipFields: FormField[] = [
  ...commonFields,
  {
    id: 'dateOfBirth',
    label: 'जन्म मिति',
    type: 'date',
    required: true
  },
  {
    id: 'citizenshipType',
    label: 'नागरिकताको प्रकार',
    type: 'select',
    options: [
      { value: 'birthCitizenship', label: 'जन्मको आधारमा' },
      { value: 'descentCitizenship', label: 'वंशजको आधारमा' }
    ],
    required: true
  }
];

export const birthRegistrationFields: FormField[] = [
  ...commonFields,
  {
    id: 'dateOfBirth',
    label: 'जन्म मिति',
    type: 'date',
    required: true
  },
  {
    id: 'birthPlace',
    label: 'जन्म स्थान',
    type: 'text',
    placeholder: 'जन्म स्थान लेख्नुहोस्',
    required: true
  },
  {
    id: 'gender',
    label: 'लिङ्ग',
    type: 'select',
    options: [
      { value: 'male', label: 'पुरुष' },
      { value: 'female', label: 'महिला' },
      { value: 'other', label: 'अन्य' }
    ],
    required: true
  }
];

export const residenceFields: FormField[] = [
  ...commonFields,
  {
    id: 'residingSince',
    label: 'बसोबास गरेको मिति देखि',
    type: 'date',
    required: true
  },
  {
    id: 'currentAddress',
    label: 'हालको ठेगाना',
    type: 'text',
    placeholder: 'हालको ठेगाना लेख्नुहोस्',
    required: true
  }
];

export const marriageFields: FormField[] = [
  ...commonFields,
  {
    id: 'spouseName',
    label: 'पति/पत्नीको नाम',
    type: 'text',
    placeholder: 'पति/पत्नीको नाम लेख्नुहोस्',
    required: true
  },
  {
    id: 'marriageDate',
    label: 'विवाह मिति',
    type: 'date',
    required: true
  },
  {
    id: 'marriageType',
    label: 'विवाहको प्रकार',
    type: 'select',
    options: [
      { value: 'arranged', label: 'माग विवाह' },
      { value: 'love', label: 'प्रेम विवाह' },
      { value: 'court', label: 'अदालती विवाह' }
    ],
    required: true
  }
];

export const relationshipFields: FormField[] = [
  ...commonFields,
  {
    id: 'relatedPersonName',
    label: 'सम्बन्धित व्यक्तिको नाम',
    type: 'text',
    placeholder: 'सम्बन्धित व्यक्तिको नाम लेख्नुहोस्',
    required: true
  },
  {
    id: 'relationship',
    label: 'नाता',
    type: 'select',
    options: [
      { value: 'father', label: 'बुवा' },
      { value: 'mother', label: 'आमा' },
      { value: 'son', label: 'छोरा' },
      { value: 'daughter', label: 'छोरी' },
      { value: 'brother', label: 'भाइ' },
      { value: 'sister', label: 'बहिनी' },
      { value: 'husband', label: 'पति' },
      { value: 'wife', label: 'पत्नी' },
      { value: 'other', label: 'अन्य' }
    ],
    required: true
  }
];

// Get fields based on Sifaris type
export const getFieldsByType = (type: string): FormField[] => {
  switch (type) {
    case 'citizenship':
      return citizenshipFields;
    case 'birth':
      return birthRegistrationFields;
    case 'residence':
      return residenceFields;
    case 'marriage':
      return marriageFields;
    case 'relationship':
      return relationshipFields;
    default:
      return commonFields;
  }
};