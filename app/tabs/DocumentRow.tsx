import {Document} from "@/lib/types/document";
import React from "react";
import {SignatureRequestModal} from "@/app/tabs/dialogs";

interface DocumentRowProps {
    document: Document;
    onDocumentDeleted?: () => void;
    showActions?: boolean;
}

export default function DocumentRow({document, onDocumentDeleted, showActions = true}: DocumentRowProps) {
    const [showSignatureModal, setShowSignatureModal] = React.useState(false);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

    const handleRequestSignature = () => {
        setShowSignatureModal(true);
    };

    const handleDeleteDocument = async () => {
        if (!document._id) return;

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/documents/${document._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete document');
            }

            // Call the callback to refresh the document list
            if (onDocumentDeleted) {
                onDocumentDeleted();
            }

            setShowDeleteConfirm(false);
        } catch (error) {
            console.error('Error deleting document:', error);
            alert(`Failed to delete document: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsDeleting(false);
        }
    };

    // Status badge styling
    const getStatusStyle = () => {
        switch (document.status) {
            case 'Signed':
                return 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200';
            case 'Pending Signature':
                return 'bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200';
            case 'Rejected':
                return 'bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-200';
            default:
                return 'bg-gray-100 dark:bg-gray-800/30 text-gray-800 dark:text-gray-200';
        }
    };

    // Status icon
    const getStatusIcon = () => {
        switch (document.status) {
            case 'Signed':
                return (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                );
            case 'Pending Signature':
                return (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                );
            case 'Rejected':
                return (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                );
            default:
                return (
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                );
        }
    };

    return (
        <div
            className="bg-theme-card dark:bg-theme-card-dark border border-gray-200 dark:border-gray-700 rounded-lg mb-3 p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Document info */}
                <div className="flex-1 mb-3 md:mb-0 md:mr-4">
                    <h3 className="font-semibold text-lg text-theme-gray-900 dark:text-theme-gray-100 mb-1">{document.title}</h3>
                    <div className="flex flex-wrap items-center">
                        <span
                            className="text-sm text-theme-gray-500 dark:text-theme-gray-400 capitalize mr-3">{document.type}</span>
                        <div className="flex items-center text-sm text-theme-gray-500 dark:text-theme-gray-400 mr-3">
                            <svg className="w-4 h-4 mr-1 text-theme-gray-500 dark:text-theme-gray-400" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            {new Date(document.createdAt).toLocaleDateString()}
                        </div>
                        <span
                            className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${getStatusStyle()}`}>
                            {getStatusIcon()}
                            {document.status}
                        </span>
                    </div>

                    {document.status === 'Pending Signature' && document.signatureRequest?.requestedToEmail && (
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm italic mt-2">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Waiting for signature from {document.signatureRequest.requestedToEmail}
                        </div>
                    )}
                </div>

                {/* Actions */}
                {showActions && (
                <div className="flex flex-wrap gap-2">
                    <a
                        href={document.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-theme-primary-600 hover:bg-theme-primary-700 dark:bg-theme-primary-700 dark:hover:bg-theme-primary-800 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center text-xs"
                        title="Download the original document">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                        DOWNLOAD
                    </a>

                    {document.status === 'Created' && (
                        <button
                            onClick={handleRequestSignature}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center text-xs"
                            title="Request a signature for this document">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                            </svg>
                            REQUEST SIGNATURE
                        </button>
                    )}

                    {document.status === 'Pending Signature' && (
                        <button
                            onClick={handleRequestSignature}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center text-xs"
                            title="Send the signature request again">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                            REQUEST AGAIN
                        </button>
                    )}

                    {document.status === 'Signed' && document.signedDocumentUrl && (
                        <a
                            href={document.signedDocumentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center text-xs"
                            title="View the signed document">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                            </svg>
                            VIEW SIGNED
                        </a>
                    )}

                    <button
                        onClick={() => {
                            // Copy document link to clipboard
                            const url = document.publicUrl;
                            navigator.clipboard.writeText(url).then(() => {
                                alert('Document link copied to clipboard!');
                            });
                        }}
                        className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center text-xs"
                        title="Copy document link to clipboard">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                        </svg>
                        COPY LINK
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete this document">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        {isDeleting ? 'DELETING...' : 'DELETE'}
                    </button>
                </div>
                )}
            </div>

            {showSignatureModal && (
                <SignatureRequestModal
                    document={document}
                    onClose={() => setShowSignatureModal(false)}
                />
            )}

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center mb-4">
                            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                Delete Document
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to delete &#34;{document.title}&#34;? This action cannot be undone and will permanently remove the document and all associated files.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteDocument}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
