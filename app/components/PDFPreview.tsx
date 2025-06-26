import React, { useState, useEffect } from 'react';

interface PDFPreviewProps {
    sifarisType: string;
    formData: any;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({sifarisType, formData}) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const generatePDF = async () => {
            try {
                setLoading(true);
                setError(null);

                // Make a POST request to the API endpoint
                const response = await fetch('/api/pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        sifarisType,
                        formData,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to generate PDF: ${response.statusText}`);
                }

                // Get the PDF as a blob
                const pdfBlob = await response.blob();

                // Create a URL for the blob
                const url = URL.createObjectURL(pdfBlob);
                setPdfUrl(url);
            } catch (err) {
                console.error('Error generating PDF:', err);
                setError('PDF जेनेरेट गर्न समस्या भयो। कृपया पुन: प्रयास गर्नुहोस्।');
            } finally {
                setLoading(false);
            }
        };

        generatePDF();

        // Cleanup function to revoke the object URL when component unmounts
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [sifarisType, formData]);

    return (
        <div className="mt-4">
            {loading && (
                <div className="flex justify-center items-center h-96 bg-theme-gray-100 rounded-lg border border-theme-gray-300">
                    <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-primary-600"></div>
                        <p className="mt-4 text-theme-gray-600">PDF तयार हुँदैछ...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-theme-error bg-opacity-10 border border-theme-error border-opacity-30 text-theme-error px-4 py-3 rounded-lg mb-4">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && pdfUrl && (
                <div className="border border-theme-gray-300 rounded-lg overflow-hidden shadow-md">
                    <div className="flex justify-between items-center p-4 bg-theme-gray-100 border-b border-theme-gray-300">
                        <span className="font-semibold text-theme-gray-800">PDF प्रिभ्यू</span>
                        <div className="flex space-x-2">
                            <a 
                                href={pdfUrl} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-4 bg-theme-gray-600 hover:bg-theme-gray-700 text-theme-light font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-gray focus:ring-offset-2 transition-colors"
                            >
                                पूर्ण स्क्रिनमा हेर्नुहोस्
                            </a>
                            <a 
                                href={pdfUrl} 
                                download={`sifaris-${sifarisType}.pdf`}
                                className="py-2 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-light font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-colors"
                            >
                                डाउनलोड गर्नुहोस्
                            </a>
                        </div>
                    </div>
                    <iframe 
                        src={pdfUrl} 
                        className="w-full h-[600px]"
                        title="PDF Preview"
                    />
                </div>
            )}
        </div>
    );
};

export default PDFPreview;

