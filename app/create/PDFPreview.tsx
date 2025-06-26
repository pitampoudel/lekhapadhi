import React, {useCallback, useEffect, useState} from 'react';
import {Document, DocumentStatus} from '@/lib/types/document';
import {
    AlertCircleIcon,
    CheckCircleIcon,
    DownloadIcon,
    ExternalLinkIcon,
    FileTextIcon,
    Loader2Icon,
    RefreshCwIcon
} from 'lucide-react';
import {CreateDocFormData} from "@/app/create/DynamicForm";
import {docTypes} from "@/app/config/data";

interface PDFPreviewProps {
    docType: string;
    formData: CreateDocFormData;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({docType, formData}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [createdDocument, setCreatedDocument] = useState<Document | null>(null);
    const [documentUrl, setDocumentUrl] = useState<string | null>(null);
    const [retrying, setRetrying] = useState<boolean>(false);

    // Get document type name
    const docTypeName = docTypes.find(t => t.id === docType)?.name || docType;

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
            {/* Simplified loading state */}
            {loading && (
                <div
                    className="flex justify-center items-center h-96 bg-white rounded-lg border border-theme-gray-200 shadow-md"
                    role="status"
                    aria-live="polite"
                >
                    <div className="flex items-center">
                        <Loader2Icon className="animate-spin h-6 w-6 text-theme-primary-600 mr-2"/>
                        <p className="text-theme-gray-600">कागजात तयार हुँदैछ...</p>
                    </div>
                </div>
            )}

            {/* Simplified error state */}
            {error && (
                <div
                    className="bg-white border border-theme-gray-200 rounded-lg shadow-md overflow-hidden"
                    role="alert"
                >
                    <div className="p-4 bg-theme-error-50 border-b border-theme-error-200 flex items-center">
                        <AlertCircleIcon className="w-5 h-5 text-theme-error-600 mr-2 flex-shrink-0"/>
                        <p className="text-theme-error-700">कागजात तयार गर्न समस्या भयो</p>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-theme-gray-600 mb-4">{error}</p>
                        <button
                            onClick={handleRetry}
                            disabled={retrying}
                            className="py-2 px-3 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-medium rounded-md shadow-sm transition-colors flex items-center"
                        >
                            {retrying ? (
                                <>
                                    <Loader2Icon className="animate-spin w-4 h-4 mr-1"/>
                                    पुन: प्रयास गर्दै...
                                </>
                            ) : (
                                <>
                                    <RefreshCwIcon className="w-4 h-4 mr-1"/>
                                    पुन: प्रयास
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Success state */}
            {!loading && !error && documentUrl && (
                <div className="border border-theme-gray-200 rounded-lg overflow-hidden shadow-md">
                    {/* Simple header with actions */}
                    <div className="p-4 bg-theme-gray-50 border-b border-theme-gray-200 flex justify-between items-center">
                        <span className="font-semibold text-theme-gray-800">
                            <FileTextIcon className="inline-block w-5 h-5 mr-2 text-theme-primary-600"/>
                            कागजात प्रिभ्यू
                        </span>
                        <div className="flex gap-2">
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-2 px-3 bg-theme-gray-600 hover:bg-theme-gray-700 text-white font-medium rounded-md shadow-sm transition-colors flex items-center"
                            >
                                <ExternalLinkIcon className="w-4 h-4 mr-1"/>
                                हेर्नुहोस्
                            </a>
                            <a
                                href={documentUrl}
                                download={`${docTypeName.replace(/\s+/g, '-')}.docx`}
                                className="py-2 px-3 bg-theme-primary-600 hover:bg-theme-primary-700 text-white font-medium rounded-md shadow-sm transition-colors flex items-center"
                            >
                                <DownloadIcon className="w-4 h-4 mr-1"/>
                                डाउनलोड
                            </a>
                        </div>
                    </div>

                    {/* Simplified document view */}
                    <div className="p-4 bg-white">
                        {createdDocument && (
                            <div className="mb-4 p-3 bg-theme-success-50 border border-theme-success-200 rounded-lg flex items-center">
                                <CheckCircleIcon className="w-5 h-5 text-theme-success-600 mr-2 flex-shrink-0"/>
                                <p className="text-theme-success-700 text-sm">
                                    कागजात सफलतापूर्वक तयार भयो!
                                </p>
                            </div>
                        )}

                        {/* Document preview */}
                        <div className="border border-theme-gray-200 rounded-lg overflow-hidden h-96 flex items-center justify-center bg-theme-gray-50">
                            <iframe 
                                src={documentUrl || ''} 
                                className="w-full h-full" 
                                title="Document Preview"
                                sandbox="allow-same-origin allow-scripts"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFPreview;
