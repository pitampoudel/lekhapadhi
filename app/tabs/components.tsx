import React, {JSX} from "react";
import {DocumentStatus} from "@/lib/types/document";

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
