import React from "react";
import {Document, DocumentStatus} from "@/lib/types/document";
import {SignatureRequestModal} from "@/app/tabs/dialogs";

// Function to render the status badge with appropriate color
export const renderStatusBadge = (status: string, signatureRequestedToEmail: string | undefined) => {
    let bgColor: string;
    let textColor: string;
    switch (status) {
        case DocumentStatus.SIGNED:
            bgColor = 'bg-green-100';
            textColor = 'text-green-800';
            break;
        case DocumentStatus.PENDING_SIGNATURE:
            bgColor = 'bg-blue-100';
            textColor = 'text-blue-800';
            break;
        case DocumentStatus.REJECTED:
            bgColor = 'bg-red-100';
            textColor = 'text-red-800';
            break;
        default:
            bgColor = 'bg-gray-100';
            textColor = 'text-gray-800';
    }

    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div className="flex flex-col gap-1">
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
      {status}
    </span>
                {
                    status == DocumentStatus.PENDING_SIGNATURE && signatureRequestedToEmail &&
                    <span className="text-blue-600 text-sm italic">

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
        <td className="px-6 py-4 whitespace-nowrap text-sm flex space-x-2">
            <a
                href={document.publicUrl}
                className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">
                DOWNLOAD ORIGINAL
            </a>

            {document.status === DocumentStatus.CREATED && (
                <button
                    onClick={handleRequestSignature}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">
                    REQUEST SIGNATURE
                </button>
            )}

            {/* Show a message for the requesting user when document is pending signature */}
            {document.status === DocumentStatus.PENDING_SIGNATURE && (<>
                    <button
                        onClick={handleRequestSignature}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">
                        REQUEST AGAIN
                    </button>
                </>

            )}

            {document.status === DocumentStatus.SIGNED && document.signedDocumentUrl && (
                <a
                    href={document.signedDocumentUrl}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">
                    VIEW SIGNED
                </a>
            )}

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
