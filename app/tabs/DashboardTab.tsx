"use client";
import React from "react";
import {CheckCircleIcon, ChevronRightIcon, ClockIcon, FileTextIcon} from "lucide-react";
import Card from "../components/Card";

type OverviewTabProps = {
    setActiveTab: (tab: string) => void;
};

export default function DashboardTab({setActiveTab}: OverviewTabProps) {
    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card
                    title="Created"
                    value="4"
                    icon={<FileTextIcon className="w-5 h-5 text-blue-500"/>}
                    trend="+2 this month"
                    color="blue"
                />
                <Card
                    title="Signed"
                    value="2"
                    icon={<CheckCircleIcon className="w-5 h-5 text-green-500"/>}
                    trend="100% success rate"
                    color="green"
                />
                <Card
                    title="Under Review"
                    value="1"
                    icon={<ClockIcon className="w-5 h-5 text-amber-500"/>}
                    trend="Avg. 2 days wait time"
                    color="amber"
                />
            </section>

            <section className="bg-theme-card rounded-lg shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-theme-gray-900">Recent Documents</h2>
                    <button
                        onClick={() => setActiveTab("documents")}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                        View all <ChevronRightIcon className="w-4 h-4 ml-1"/>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-theme-card">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Document
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-theme-gray-600 uppercase tracking-wider">Status</th>
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
                        </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

