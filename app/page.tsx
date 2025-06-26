'use client';

import React, {useState} from 'react';
import SifarisTypeDropdown from './components/SifarisTypeDropdown';
import SifarisForm from './components/SifarisForm';
import PDFPreview from './components/PDFPreview';

export default function Home() {
    const [sifarisType, setSifarisType] = useState('');
    const [formData, setFormData] = useState<any>(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleTypeChange = (type: string) => {
        setSifarisType(type);
        setFormData(null);
        setShowPreview(false);
    };

    const handleFormSubmit = (data: any) => {
        setFormData(data);
        setShowPreview(true);
    };

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
                    <h2 className="text-2xl font-bold mb-6 text-center">सिफारिस पत्र तयार गर्नुहोस्</h2>

                    <SifarisTypeDropdown
                        selectedType={sifarisType}
                        onTypeChange={handleTypeChange}
                    />

                    {sifarisType && !showPreview && (
                        <SifarisForm
                            sifarisType={sifarisType}
                            onFormSubmit={handleFormSubmit}
                        />
                    )}

                    {showPreview && formData && (
                        <>
                            <div className="mb-6">
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="py-2 px-4 bg-theme-gray-600 hover:bg-theme-gray-700 text-theme-white font-bold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-theme-gray focus:ring-offset-2"
                                >
                                    फारम सम्पादन गर्नुहोस्
                                </button>
                            </div>

                            <PDFPreview
                                sifarisType={sifarisType}
                                formData={formData}
                            />
                        </>
                    )}
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
