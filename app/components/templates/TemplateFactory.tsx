import React from 'react';
import CitizenshipTemplate from './CitizenshipTemplate';
import BaseTemplate from './BaseTemplate';
import { convertToFormattedNepaliDate } from '../../utils/nepaliDate';

interface TemplateFactoryProps {
  sifarisType: string;
  formData: any;
}

const BirthRegistrationTemplate: React.FC<{ formData: any }> = ({ formData }) => {
  const nepaliDOB = formData.dateOfBirth ? convertToFormattedNepaliDate(formData.dateOfBirth) : '';
  const genderNepali = {
    'male': 'पुरुष',
    'female': 'महिला',
    'other': 'अन्य'
  }[formData.gender] || '';

  return (
    <BaseTemplate formData={formData}>
      <div className="text-justify leading-relaxed">
        <p className="mb-4">
          यस कार्यालयमा बस्ने श्री {formData.fatherName} तथा श्रीमती {formData.motherName} को 
          {genderNepali === 'पुरुष' ? ' छोरा ' : genderNepali === 'महिला' ? ' छोरी ' : ' सन्तान '} 
          {formData.permanentAddress} स्थायी ठेगाना भएका श्री {formData.fullName} मिति {nepaliDOB} मा 
          {formData.birthPlace} मा जन्म भएको व्यहोरा प्रमाणित गरिन्छ।
        </p>
        
        <p className="mb-4">
          निजको जन्म दर्ता प्रमाणपत्र जारी गर्नका लागि सिफारिस गरिन्छ।
        </p>
        
        <p className="mb-4">
          सिफारिसको कारण: {formData.reason}
        </p>
      </div>
    </BaseTemplate>
  );
};

const ResidenceTemplate: React.FC<{ formData: any }> = ({ formData }) => {
  const residingSince = formData.residingSince ? convertToFormattedNepaliDate(formData.residingSince) : '';

  return (
    <BaseTemplate formData={formData}>
      <div className="text-justify leading-relaxed">
        <p className="mb-4">
          यस कार्यालयको वडा नं {formData.wardNo} अन्तर्गत {formData.permanentAddress} स्थायी ठेगाना भएका 
          श्री {formData.fullName} (बुवाको नाम: श्री {formData.fatherName}, आमाको नाम: श्रीमती {formData.motherName}) 
          मिति {residingSince} देखि हालसम्म {formData.currentAddress} मा स्थायी बसोबास गर्दै आउनु भएको व्यहोरा प्रमाणित गरिन्छ।
        </p>
        
        <p className="mb-4">
          सिफारिसको कारण: {formData.reason}
        </p>
      </div>
    </BaseTemplate>
  );
};

const MarriageTemplate: React.FC<{ formData: any }> = ({ formData }) => {
  const marriageDate = formData.marriageDate ? convertToFormattedNepaliDate(formData.marriageDate) : '';
  const marriageTypeNepali = {
    'arranged': 'माग विवाह',
    'love': 'प्रेम विवाह',
    'court': 'अदालती विवाह'
  }[formData.marriageType] || '';

  return (
    <BaseTemplate formData={formData}>
      <div className="text-justify leading-relaxed">
        <p className="mb-4">
          यस कार्यालयको वडा नं {formData.wardNo} अन्तर्गत {formData.permanentAddress} स्थायी ठेगाना भएका 
          श्री {formData.fullName} (बुवाको नाम: श्री {formData.fatherName}, आमाको नाम: श्रीमती {formData.motherName}) 
          र श्री/श्रीमती {formData.spouseName} बीच मिति {marriageDate} मा {marriageTypeNepali} भएको व्यहोरा प्रमाणित गरिन्छ।
        </p>
        
        <p className="mb-4">
          निजहरूको विवाह दर्ता प्रमाणपत्र जारी गर्नका लागि सिफारिस गरिन्छ।
        </p>
        
        <p className="mb-4">
          सिफारिसको कारण: {formData.reason}
        </p>
      </div>
    </BaseTemplate>
  );
};

const RelationshipTemplate: React.FC<{ formData: any }> = ({ formData }) => {
  const relationshipNepali = {
    'father': 'बुवा',
    'mother': 'आमा',
    'son': 'छोरा',
    'daughter': 'छोरी',
    'brother': 'भाइ',
    'sister': 'बहिनी',
    'husband': 'पति',
    'wife': 'पत्नी',
    'other': 'अन्य'
  }[formData.relationship] || '';

  return (
    <BaseTemplate formData={formData}>
      <div className="text-justify leading-relaxed">
        <p className="mb-4">
          यस कार्यालयको वडा नं {formData.wardNo} अन्तर्गत {formData.permanentAddress} स्थायी ठेगाना भएका 
          श्री {formData.fullName} (बुवाको नाम: श्री {formData.fatherName}, आमाको नाम: श्रीमती {formData.motherName}) 
          र श्री/श्रीमती {formData.relatedPersonName} बीच {relationshipNepali}को नाता रहेको व्यहोरा प्रमाणित गरिन्छ।
        </p>
        
        <p className="mb-4">
          सिफारिसको कारण: {formData.reason}
        </p>
      </div>
    </BaseTemplate>
  );
};

const TemplateFactory: React.FC<TemplateFactoryProps> = ({ sifarisType, formData }) => {
  switch (sifarisType) {
    case 'citizenship':
      return <CitizenshipTemplate formData={formData} />;
    case 'birth':
      return <BirthRegistrationTemplate formData={formData} />;
    case 'residence':
      return <ResidenceTemplate formData={formData} />;
    case 'marriage':
      return <MarriageTemplate formData={formData} />;
    case 'relationship':
      return <RelationshipTemplate formData={formData} />;
    default:
      return <BaseTemplate formData={formData}><p>सिफारिस प्रकार छनौट गर्नुहोस्</p></BaseTemplate>;
  }
};

export default TemplateFactory;