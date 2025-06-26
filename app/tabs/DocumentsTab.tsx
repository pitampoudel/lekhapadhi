"use client";
import React, {useEffect, useState} from "react";
import {Document, DocumentStatus} from "@/lib/types/document";

// Function to render the status badge with appropriate color
export const renderStatusBadge = (status: string) => {
    let bgColor: string;
    let textColor: string;
    switch (status) {
        case DocumentStatus.SIGNED:
            bgColor = 'bg-green-100';
            textColor = 'text-green-800';
            break;
        case DocumentStatus.UNDER_REVIEW:
            bgColor = 'bg-amber-100';
            textColor = 'text-amber-800';
            break;
        case DocumentStatus.PENDING:
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
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor} ${textColor}`}>
                {status}
            </span>
    );
};

export function DocumentRow({document}: { document: Document }) {
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
            {renderStatusBadge(document.status)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
            <a
                href={document.publicUrl}
                className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">
                VIEW DETAILS
            </a>
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

export default function DocumentsTab() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        try {
            setLoading(true);
            fetch('/api/documents').then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch documents');
                }
                res.json().then((data) => {
                    console.log(data);
                    setDocuments(data);
                })
            });
        } catch (err) {
            console.error('Error fetching documents:', err);
            setError('Failed to load documents. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);


    return (
        <div className="bg-theme-card rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-theme-gray-900 mb-4">Documents</h2>

            {loading ? (
                <div className="text-center py-4">
                    <p>Loading documents...</p>
                </div>
            ) : error ? (
                <div className="text-center py-4 text-red-500">
                    <p>{error}</p>
                </div>
            ) : documents.length === 0 ? (
                <div className="text-center py-4">
                    <p className="mb-4">No documents found. Create your first document from the Create tab.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <DocumentsHeader/>
                        <tbody className="bg-theme-card divide-y divide-gray-200">
                        {documents.map((document) => <DocumentRow key={document._id} document={document}/>)}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
