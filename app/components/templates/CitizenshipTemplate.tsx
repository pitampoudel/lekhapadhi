import React from 'react';
import BaseTemplate from './BaseTemplate';
import { convertToFormattedNepaliDate } from '../../utils/nepaliDate';

interface CitizenshipTemplateProps {
  formData: any;
}

const CitizenshipTemplate: React.FC<CitizenshipTemplateProps> = ({ formData }) => {
  // Convert date of birth to Nepali format
  const nepaliDOB = formData.dateOfBirth ? convertToFormattedNepaliDate(formData.dateOfBirth) : '';
  
  // Determine citizenship type in Nepali
  const citizenshipTypeNepali = formData.citizenshipType === 'birthCitizenship' 
    ? 'जन्मको आधारमा' 
    : 'वंशजको आधारमा';

  return (
    <BaseTemplate formData={formData}>
      <div className="text-justify leading-relaxed">
        <p className="mb-4">
          यस कार्यालयमा बस्ने श्री {formData.fatherName} तथा श्रीमती {formData.motherName} को 
          {formData.citizenshipType === 'birthCitizenship' ? ' छोरा/छोरी ' : ' छोरा/छोरी '} 
          {formData.permanentAddress} स्थायी ठेगाना भएका श्री {formData.fullName} मिति {nepaliDOB} मा 
          जन्म भई हालसम्म यसै वडामा स्थायी बसोबास गर्दै आउनु भएको व्यहोरा प्रमाणित गरिन्छ।
        </p>
        
        <p className="mb-4">
          निजले नेपाली नागरिकताको प्रमाणपत्र {citizenshipTypeNepali} प्राप्त गर्न निम्न कागजातहरू यसै साथ संलग्न राखी 
          सिफारिस माग गर्नु भएकोले निजलाई नेपाली नागरिकताको प्रमाणपत्र प्रदान गर्न सिफारिस गरिन्छ।
        </p>
        
        <p className="mb-4">
          सिफारिसको कारण: {formData.reason}
        </p>
        
        <div className="mt-8">
          <h3 className="font-semibold mb-2">संलग्न कागजातहरू:</h3>
          <ol className="list-decimal pl-6">
            <li>जन्म दर्ता प्रमाणपत्रको प्रतिलिपि</li>
            <li>बाबु/आमाको नागरिकता प्रमाणपत्रको प्रतिलिपि</li>
            <li>शैक्षिक योग्यताको प्रमाणपत्रको प्रतिलिपि</li>
            {formData.citizenshipType === 'birthCitizenship' && (
              <li>जन्म स्थान प्रमाणित कागजात</li>
            )}
          </ol>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default CitizenshipTemplate;