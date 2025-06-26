import React, {useEffect, useState} from 'react';
import {Document} from '@/lib/types/document';

interface PDFPreviewProps {
    docType: string;
    formData: any;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({docType, formData}) => {
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [createdDocument, setCreatedDocument] = useState<Document | null>(null);

    useEffect(() => {
        const createDocument = async () => {
            try {
                setLoading(true);
                setError(null);

                // Make a POST request to the documents API endpoint
                const response = await fetch('/api/documents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        docType,
                        formData,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to create document: ${response.statusText}`);
                }

                // Get the created document data
                const document: Document = await response.json();
                setCreatedDocument(document);
                setDocumentUrl(document.publicUrl);
            } catch (err) {
                console.error('Error creating document:', err);
                setError('कागजात तयार गर्न समस्या भयो। कृपया पुन: प्रयास गर्नुहोस्।');
            } finally {
                setLoading(false);
            }
        };

        createDocument();
    }, [docType, formData]);

    return (
        <div className="mt-4">
            {loading && (
                <div
                    className="flex justify-center items-center h-96 bg-theme-gray-100 rounded-lg border border-theme-gray-300">
                    <div className="flex flex-col items-center">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-primary-600"></div>
                        <p className="mt-4 text-theme-gray-600">कागजात तयार हुँदैछ...</p>
                    </div>
                </div>
            )}

            {error && (
                <div
                    className="bg-theme-error bg-opacity-10 border border-theme-error border-opacity-30 text-theme-error px-4 py-3 rounded-lg mb-4">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && documentUrl && (
                <div className="border border-theme-gray-300 rounded-lg overflow-hidden shadow-md">
                    <div
                        className="flex justify-between items-center p-4 bg-theme-gray-100 border-b border-theme-gray-300">
                        <span className="font-semibold text-theme-gray-800">कागजात प्रिभ्यू</span>
                        <div className="flex space-x-2">
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-4 bg-theme-gray-600 hover:bg-theme-gray-700 text-theme-light font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-gray focus:ring-offset-2 transition-colors"
                            >
                                पूर्ण स्क्रिनमा हेर्नुहोस्
                            </a>
                            <a
                                href={documentUrl}
                                download={`sifaris-${docType}.docx`}
                                className="py-2 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-light font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-colors"
                            >
                                डाउनलोड गर्नुहोस्
                            </a>
                        </div>
                    </div>
                    <div className="p-6 bg-white">
                        <div className="mb-4 p-4 bg-theme-gray-100 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Document Created Successfully!</h3>
                            <p>Your document has been created and saved. You can view it in the Documents tab.</p>
                            {createdDocument && (
                                <div className="mt-4">
                                    <p><strong>Title:</strong> {createdDocument.title}</p>
                                    <p><strong>Type:</strong> {createdDocument.type}</p>
                                    <p><strong>Status:</strong> {createdDocument.status}</p>
                                    <p><strong>Created:</strong> {new Date(createdDocument.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                        <p className="text-center text-theme-gray-600">
                            Click the buttons above to view or download your document.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFPreview;
