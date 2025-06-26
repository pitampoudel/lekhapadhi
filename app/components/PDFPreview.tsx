import React from 'react';
import { usePDF } from 'react-to-pdf';
import TemplateFactory from './templates/TemplateFactory';

interface PDFPreviewProps {
  sifarisType: string;
  formData: any;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ sifarisType, formData }) => {
  const { toPDF, targetRef } = usePDF({
    filename: `${sifarisType}_sifaris_${formData.fullName}.pdf`,
  });

  return (
    <div className="mt-8">
      <div className="mb-6 flex gap-4 justify-center">
        <button
          onClick={() => toPDF()}
          className="py-2 px-4 bg-theme-success-600 hover:bg-theme-success-700 text-theme-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2"
        >
          PDF डाउनलोड गर्नुहोस्
        </button>
        <button
          onClick={() => window.print()}
          className="py-2 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2"
        >
          प्रिन्ट गर्नुहोस्
        </button>
      </div>

      <div className="border border-theme-gray-300 rounded-md p-4 bg-theme-white shadow-md print:shadow-none print:border-none">
        <div ref={targetRef}>
          <TemplateFactory sifarisType={sifarisType} formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
