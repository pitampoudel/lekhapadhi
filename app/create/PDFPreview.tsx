import React, {useCallback, useEffect, useState} from 'react';
import {Document, DocumentStatus} from '@/lib/types/document';
import {CreateDocFormData} from './page';
import {
    AlertCircleIcon,
    CheckCircleIcon,
    DownloadIcon,
    ExternalLinkIcon,
    FileTextIcon,
    Loader2Icon,
    RefreshCwIcon
} from 'lucide-react';
import {types} from './DocumentTypeSelector';

interface PDFPreviewProps {
    docType: string;
    formData: CreateDocFormData;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({docType, formData}) => {
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [createdDocument, setCreatedDocument] = useState<Document | null>(null);
    const [retrying, setRetrying] = useState<boolean>(false);

    // Get document type name
    const docTypeName = types.find(t => t.id === docType)?.name || docType;

    const createDocument = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            setRetrying(false);

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
                const errorData = await response.json().catch(() => null);
                throw new Error(
                    errorData?.error ||
                    `Failed to create document: ${response.statusText || response.status}`
                );
            }

            // Get the created document data
            const document: Document = await response.json();
            setCreatedDocument(document);
            setDocumentUrl(document.publicUrl);
        } catch (err: any) {
            console.error('Error creating document:', err);
            setError(err.message || 'कागजात तयार गर्न समस्या भयो। कृपया पुन: प्रयास गर्नुहोस्।');
        } finally {
            setLoading(false);
        }
    }, [docType, formData]);

    // Retry document creation
    const handleRetry = () => {
        setRetrying(true);
        createDocument();
    };

    useEffect(() => {
        createDocument();
    }, [createDocument]);

    // Format date for display
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('ne-NP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch (e) {
            console.error(e);
            return dateString;
        }
    };

    // Get status badge color
    const getStatusColor = (status: DocumentStatus) => {
        switch (status) {
            case DocumentStatus.SIGNED:
                return 'bg-theme-success-100 text-theme-success-800 border-theme-success-200';
            case DocumentStatus.UNDER_REVIEW:
                return 'bg-theme-warning-100 text-theme-warning-800 border-theme-warning-200';
            case DocumentStatus.PENDING:
                return 'bg-theme-info-100 text-theme-info-800 border-theme-info-200';
            case DocumentStatus.REJECTED:
                return 'bg-theme-error-100 text-theme-error-800 border-theme-error-200';
            default:
                return 'bg-theme-gray-100 text-theme-gray-800 border-theme-gray-200';
        }
    };

    return (
        <div className="mt-4">
            {/* Loading state */}
            {loading && (
                <div
                    className="flex justify-center items-center h-96 bg-theme-gray-50 rounded-lg border border-theme-gray-200"
                    role="status"
                    aria-live="polite"
                >
                    <div className="flex flex-col items-center">
                        <Loader2Icon className="animate-spin h-12 w-12 text-theme-primary-600"/>
                        <p className="mt-4 text-theme-gray-600">कागजात तयार हुँदैछ...</p>
                        <p className="text-sm text-theme-gray-500 mt-2">यसमा केही समय लाग्न सक्छ, कृपया प्रतीक्षा
                            गर्नुहोस्</p>
                    </div>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div
                    className="bg-theme-error-50 border border-theme-error-200 text-theme-error-700 px-6 py-5 rounded-lg mb-4"
                    role="alert"
                >
                    <div className="flex items-start">
                        <AlertCircleIcon className="w-6 h-6 mr-3 flex-shrink-0"/>
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">कागजात तयार गर्न समस्या भयो</h3>
                            <p className="mb-4">{error}</p>
                            <button
                                onClick={handleRetry}
                                disabled={retrying}
                                className="py-2 px-4 bg-theme-error-600 hover:bg-theme-error-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-error-600 focus:ring-offset-2 transition-colors flex items-center"
                            >
                                {retrying ? (
                                    <>
                                        <Loader2Icon className="animate-spin w-4 h-4 mr-2"/>
                                        पुन: प्रयास गर्दै...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCwIcon className="w-4 h-4 mr-2"/>
                                        पुन: प्रयास गर्नुहोस्
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success state */}
            {!loading && !error && documentUrl && (
                <div className="border border-theme-gray-200 rounded-lg overflow-hidden shadow-md">
                    {/* Header with actions */}
                    <div
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-theme-gray-50 border-b border-theme-gray-200"
                    >
                        <span className="font-semibold text-theme-gray-800 mb-3 sm:mb-0">
                            <FileTextIcon className="inline-block w-5 h-5 mr-2 text-theme-primary-600"/>
                            कागजात प्रिभ्यू
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-4 bg-theme-gray-600 hover:bg-theme-gray-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-gray-600 focus:ring-offset-2 transition-colors flex items-center"
                                aria-label="View document in full screen"
                            >
                                <ExternalLinkIcon className="w-4 h-4 mr-2"/>
                                पूर्ण स्क्रिनमा हेर्नुहोस्
                            </a>
                            <a
                                href={documentUrl}
                                download={`${docTypeName.replace(/\s+/g, '-')}.docx`}
                                className="py-2 px-4 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-primary-600 focus:ring-offset-2 transition-colors flex items-center"
                                aria-label="Download document"
                            >
                                <DownloadIcon className="w-4 h-4 mr-2"/>
                                डाउनलोड गर्नुहोस्
                            </a>
                        </div>
                    </div>

                    {/* Document details */}
                    <div className="p-6 bg-white">
                        <div className="mb-6 p-5 bg-theme-success-50 border border-theme-success-200 rounded-lg">
                            <div className="flex items-start">
                                <CheckCircleIcon className="w-6 h-6 text-theme-success-600 mr-3 flex-shrink-0"/>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-theme-success-800">कागजात सफलतापूर्वक
                                        तयार भयो!</h3>
                                    <p className="text-theme-success-700 mb-4">तपाईंको कागजात तयार भएको छ र सुरक्षित
                                        गरिएको छ। तपाईं यसलाई कागजातहरू ट्याबमा हेर्न सक्नुहुन्छ।</p>

                                    {createdDocument && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <p className="flex items-center text-theme-gray-700">
                                                    <span className="font-medium mr-2">शीर्षक:</span>
                                                    <span>{createdDocument.title}</span>
                                                </p>
                                                <p className="flex items-center text-theme-gray-700">
                                                    <span className="font-medium mr-2">प्रकार:</span>
                                                    <span>{createdDocument.type}</span>
                                                </p>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="flex items-center text-theme-gray-700">
                                                    <span className="font-medium mr-2">स्थिति:</span>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(createdDocument.status)}`}>
                                                        {createdDocument.status}
                                                    </span>
                                                </p>
                                                <p className="flex items-center text-theme-gray-700">
                                                    <span className="font-medium mr-2">सिर्जना मिति:</span>
                                                    <span>{formatDate(createdDocument.createdAt)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Document preview iframe or embed would go here */}
                        <div
                            className="border border-theme-gray-200 rounded-lg overflow-hidden h-64 flex items-center justify-center bg-theme-gray-50">
                            <div className="text-center p-4">
                                <FileTextIcon className="w-12 h-12 text-theme-gray-400 mx-auto mb-4"/>
                                <p className="text-theme-gray-600">
                                    माथिको बटनहरू क्लिक गरेर तपाईंको कागजात हेर्न वा डाउनलोड गर्न सक्नुहुन्छ।
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFPreview;
