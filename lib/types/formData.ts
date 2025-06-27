// Define interfaces for form data used in document generation

// Base form data interface with common fields
export interface BaseFormData {
    wardNo: string;
    fullName: string;
    additionalDetails: string;
    documentName?: string;
}

// Citizenship recommendation form data
export interface CitizenshipFormData extends BaseFormData {
    fatherName: string;
    motherName: string;
    permanentAddress: string;
    citizenshipType: 'birthCitizenship' | 'vamsaj' | string;
    dateOfBirth: string;
}

// Birth registration form data
export interface BirthRegistrationFormData extends BaseFormData {
    fatherName: string;
    motherName: string;
    gender: 'male' | 'female' | 'other' | string;
    dateOfBirth: string;
    birthPlace: string;
}

// Residence recommendation form data
export interface ResidenceFormData extends BaseFormData {
    fatherName: string;
    motherName: string;
    gender: 'male' | 'female' | 'other' | string;
    permanentAddress: string;
    currentAddress: string;
    residingSince: string;
}

// Marriage recommendation form data
export interface MarriageFormData extends BaseFormData {
    spouseName: string;
    marriageDate: string;
    marriageType: 'arranged' | 'love' | 'court' | string;
}

// Relationship recommendation form data
export interface RelationshipFormData extends BaseFormData {
    relatedPersonName: string;
    relationship: 'father' | 'mother' | 'son' | 'daughter' | 'brother' | 'sister' | 'husband' | 'wife' | string;
}

// Union type for all form data types
export type FormData =
    | CitizenshipFormData
    | BirthRegistrationFormData
    | ResidenceFormData
    | MarriageFormData
    | RelationshipFormData;
