"use client";
import React, {useEffect, useState} from "react";
import {CheckCircleIcon, ChevronRightIcon, ClockIcon, FileTextIcon} from "lucide-react";
import Card from "../components/Card";
import {Document} from "@/lib/types/document";
import DocumentRow from "@/app/tabs/DocumentRow";

type OverviewTabProps = {
    setActiveTab: (tab: string) => void;
};

export default function DashboardTab({setActiveTab}: OverviewTabProps) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/documents');
            if (!response.ok) {
                throw new Error('Failed to fetch documents');
            }
            const data = await response.json();
            setDocuments(data);
        } catch (err) {
            console.error('Error fetching documents:', err);
            setError('Failed to load documents. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments().then(r => console.log(r));
    }, []);

    // Calculate document statistics
    const createdCount = documents.filter(doc => doc.status === 'Created').length;
    const signedCount = documents.filter(doc => doc.status === 'Signed').length;
    const pendingCount = documents.filter(doc => doc.status === 'Pending Signature').length;

    // Calculate trends
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);

    const thisMonthCreated = documents.filter(doc =>
        doc.status === 'Created' && new Date(doc.createdAt) > oneMonthAgo
    ).length;

    const signedPercentage = documents.length > 0
        ? Math.round((signedCount / documents.length) * 100)
        : 0;

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card
                    title="Created"
                    value={createdCount.toString()}
                    icon={<FileTextIcon className="w-5 h-5 text-blue-500"/>}
                    trend={`+${thisMonthCreated} this month`}
                    color="blue"
                />
                <Card
                    title="Signed"
                    value={signedCount.toString()}
                    icon={<CheckCircleIcon className="w-5 h-5 text-green-500"/>}
                    trend={`${signedPercentage}% success rate`}
                    color="green"
                />
                <Card
                    title="Under Review"
                    value={pendingCount.toString()}
                    icon={<ClockIcon className="w-5 h-5 text-amber-500"/>}
                    trend="Awaiting signatures"
                    color="amber"
                />
            </section>

            <section className="bg-theme-card rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-theme-gray-900">Recent Documents</h2>
                    <button
                        onClick={() => setActiveTab("documents")}
                        className="text-sm bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-full flex items-center transition-colors cursor-pointer"
                    >
                        View all <ChevronRightIcon className="w-4 h-4 ml-1"/>
                    </button>
                </div>
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
                        <p>No documents found. Create your first document from the Create tab.</p>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-3">
                        {documents.map((document) => (
                            <DocumentRow key={document._id} document={document} onDocumentDeleted={fetchDocuments} showActions={false}/>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
