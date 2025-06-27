"use client";
import React, {useEffect, useState} from "react";
import {Document} from "@/lib/types/document";
import DocumentRow from "@/app/tabs/DocumentRow";


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
                <div className="flex flex-col space-y-3">
                    {documents.map((document) => (
                        <DocumentRow key={document._id} document={document}/>
                    ))}
                </div>
            )}
        </div>
    );
}
