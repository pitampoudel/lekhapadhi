import React, {JSX} from "react";
import {Document, DocumentStatus} from "@/lib/types/document";
import {SignatureRequestModal} from "@/app/tabs/dialogs";

// Function to render the status badge with appropriate color
export const renderStatusBadge = (status: string, signatureRequestedToEmail: string | undefined) => {
    let bgColor: string;
    let textColor: string;
    let icon: JSX.Element | null;

    switch (status) {
        case DocumentStatus.SIGNED:
            bgColor = 'bg-green-100';
            textColor = 'text-green-800';
            icon = <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
            break;
        case DocumentStatus.PENDING_SIGNATURE:
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-800';
            icon = <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            break;
        case DocumentStatus.REJECTED:
            bgColor = 'bg-red-100';
            textColor = 'text-red-800';
            icon = <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
            break;
        default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-800';
            icon = <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
    }

    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex flex-col gap-1">
                <span className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
                    {icon}
                    {status}
                </span>
                {
                    status == DocumentStatus.PENDING_SIGNATURE && signatureRequestedToEmail &&
                    <span className="text-blue-600 text-sm italic flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Waiting for signature from {signatureRequestedToEmail}
                    </span>
                }
            </div>
        </td>
    );
};

export function DocumentRow({document}: { document: Document }) {
    const [showSignatureModal, setShowSignatureModal] = React.useState(false);
    const handleRequestSignature = () => {
        setShowSignatureModal(true);
    };

    return <tr key={document._id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-gray-900">
            <div className="flex flex-col">
                <span className="font-semibold text-theme-gray-900">{document.title}</span>
                <span className="text-xs text-theme-gray-500 capitalize">{document.type}</span>
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-gray-600">
            {new Date(document.createdAt).toLocaleDateString()}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            {renderStatusBadge(document.status, document.signatureRequest?.requestedToEmail)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <div className="flex flex-wrap gap-2">
                <a
                    href={document.publicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
                    title="Download the original document">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    DOWNLOAD
                </a>

                {document.status === DocumentStatus.CREATED && (
                    <button
                        onClick={handleRequestSignature}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
                        title="Request a signature for this document">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        REQUEST SIGNATURE
                    </button>
                )}

                {document.status === DocumentStatus.PENDING_SIGNATURE && (
                    <button
                        onClick={handleRequestSignature}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
                        title="Send the signature request again">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        REQUEST AGAIN
                    </button>
                )}

                {document.status === DocumentStatus.SIGNED && document.signedDocumentUrl && (
                    <a
                        href={document.signedDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
                        title="View the signed document">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center"
                    title="Copy document link to clipboard">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    COPY LINK
                </button>
            </div>

            {showSignatureModal && (
                <SignatureRequestModal
                    document={document}
                    onClose={() => setShowSignatureModal(false)}
                />
            )}
        </td>
    </tr>
}

export function DocumentsHeader() {
    return <thead className="bg-theme-card">
    <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Document
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Actions</th>
    </tr>
    </thead>
}
