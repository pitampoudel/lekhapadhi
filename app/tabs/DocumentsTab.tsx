"use client";
import React from "react";

export default function DocumentsTab() {
    return (
        <div className="bg-theme-card rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-theme-gray-900 mb-4">My Documents</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-theme-card">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Document
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-theme-card divide-y divide-gray-200">
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-gray-900">नागरिकता
                            सिफारिस
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-gray-600">2023-05-15</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Signed
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">Download</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-gray-900">जन्म
                            दर्ता सिफारिस
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-gray-600">2023-06-20</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                                Under Review
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">Track</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-gray-900">चारित्रिक
                            प्रमाणपत्र
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-gray-600">2023-04-10</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Signed
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">Download</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-theme-gray-900">विवाह
                            दर्ता सिफारिस
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-gray-600">2023-03-05</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Rejected
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="bg-theme-primary-600 hover:bg-theme-primary-700 text-white px-3 py-1 rounded-md transition-colors cursor-pointer">View Details</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
