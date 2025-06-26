import React from 'react';
import Image from 'next/image';
import { getCurrentNepaliDateFormatted } from '../../utils/nepaliDate';

interface BaseTemplateProps {
  formData: any;
  children?: React.ReactNode;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({ formData, children }) => {
  const currentDate = getCurrentNepaliDateFormatted();

  return (
    <div className="p-8 max-w-4xl mx-auto bg-theme-white">
      {/* Letterhead */}
      <div className="text-center mb-8 relative">
        <div className="absolute left-0 top-0">
          <Image 
            src="/ward-logo.svg" 
            alt="Ward Logo" 
            width={80} 
            height={80} 
            className="print:w-[80px] print:h-[80px]"
          />
        </div>
        <h1 className="text-2xl font-bold">नेपाल सरकार</h1>
        <h2 className="text-xl font-semibold">गृह मन्त्रालय</h2>
        <h3 className="text-lg">जिल्ला प्रशासन कार्यालय</h3>
        <p>वडा नं {formData.wardNo}, काठमाडौं</p>
        <p className="mt-2">पत्र संख्या: {new Date().getFullYear()}/{new Date().getFullYear() + 1}</p>
        <p>मिति: {currentDate}</p>
      </div>

      {/* Subject */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center underline">विषय: सिफारिस सम्बन्धमा</h2>
      </div>

      {/* Content */}
      <div className="mb-8">
        {children}
      </div>

      {/* Signature */}
      <div className="mt-16 flex justify-end">
        <div className="text-center">
          <p className="mb-16">................................</p>
          <p className="font-semibold">हस्ताक्षर</p>
          <p>वडा अध्यक्ष</p>
        </div>
      </div>
    </div>
  );
};

export default BaseTemplate;
