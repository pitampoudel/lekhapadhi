'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-theme-primary-700 text-theme-white p-6 shadow-md">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-center">लेखापाडी</h1>
                    <p className="text-center mt-2">सरकारी सिफारिस पत्र जेनेरेटर</p>
                </div>
            </header>

            <main className="flex-grow max-w-6xl mx-auto p-6 md:p-8 w-full">
                <div className="bg-theme-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">लेखापाडीमा स्वागत छ</h2>

                    <div className="text-center mb-8">
                        <p className="text-lg mb-4">
                            लेखापाडी एक सरल र सहज सरकारी सिफारिस पत्र जेनेरेटर हो। यसले विभिन्न प्रकारका सिफारिस पत्रहरू सजिलै तयार गर्न मद्दत गर्दछ।
                        </p>
                        <p className="text-lg mb-6">
                            सिफारिस पत्र तयार गर्न तलको बटनमा क्लिक गर्नुहोस्।
                        </p>

                        <Link href="/generate" className="py-3 px-6 bg-theme-primary-600 hover:bg-theme-primary-700 text-theme-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 text-lg">
                            सिफारिस पत्र तयार गर्नुहोस्
                        </Link>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4 text-center">विशेषताहरू</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-bold mb-2">सरल प्रयोग</h4>
                                <p>सजिलो फारम भर्नुहोस् र तुरुन्तै सिफारिस पत्र प्राप्त गर्नुहोस्</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-bold mb-2">विभिन्न प्रकारका सिफारिसहरू</h4>
                                <p>नागरिकता, स्थायी बसोबास, जन्म प्रमाणित लगायत विभिन्न सिफारिसहरू</p>
                            </div>
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-bold mb-2">पिडिएफ डाउनलोड</h4>
                                <p>तयार भएको सिफारिस पत्र पिडिएफ रूपमा डाउनलोड गर्नुहोस्</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-theme-gray-800 text-theme-white p-6 mt-auto">
                <div className="max-w-6xl mx-auto text-center">
                    <p>© {new Date().getFullYear()} लेखापाडी - सबै अधिकार सुरक्षित</p>
                    <p className="mt-2 text-sm">नेपाली सरकारी सिफारिस पत्र जेनेरेटर</p>
                </div>
            </footer>
        </div>
    );
}
