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
        <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">सिफारिस पत्र प्रिभ्यू</h3>

            {loading && (
                <div className="flex justify-center items-center h-96 bg-theme-gray-100 rounded-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-primary-700"></div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && pdfUrl && (
                <div className="border border-theme-gray-300 rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center p-4 bg-theme-gray-100 border-b border-theme-gray-300">
                        <span className="font-semibold">PDF प्रिभ्यू</span>
                        <a 
                            href={pdfUrl} 
                            download={`sifaris-${sifarisType}.pdf`}
                            className="py-2 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2"
                        >
                            डाउनलोड गर्नुहोस्
                        </a>
                    </div>
                    <iframe 
                        src={pdfUrl} 
                        className="w-full h-screen"
                        title="PDF Preview"
                    />
                </div>
            )}
        </div>
    );
};

export default PDFPreview;
