"use client";
import React from 'react';
import {FileTextIcon, UploadIcon} from 'lucide-react';

interface ModeSelectorProps {
    onModeSelect: (mode: 'template' | 'upload') => void;
}

export default function ModeSelector({onModeSelect}: ModeSelectorProps) {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-theme-gray-900 mb-2">Create Document</h2>
                <p className="text-theme-gray-600">Choose how you want to create your document</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Template Creation Option */}
                <button
                    onClick={() => onModeSelect('template')}
                    className="cursor-pointer group p-6 bg-theme-card rounded-lg border-2 border-theme-gray-200 hover:border-theme-primary-500 hover:bg-theme-primary-50 transition-all duration-200 text-left"
                >
                    <div
                        className="flex items-center justify-center w-12 h-12 bg-theme-primary-100 rounded-lg mb-4 group-hover:bg-theme-primary-200">
                        <FileTextIcon className="w-6 h-6 text-theme-primary-600"/>
                    </div>
                    <h3 className="text-lg font-semibold text-theme-gray-900 mb-2">Create from Template</h3>
                    <p className="text-theme-gray-600 text-sm">
                        Generate documents using predefined templates with form fields
                    </p>
                    <div className="mt-4 text-xs text-theme-gray-500">
                        • Fill out forms
                        • Auto-generated content
                        • Professional formatting
                    </div>
                </button>

                {/* File Upload Option */}
                <button
                    onClick={() => onModeSelect('upload')}
                    className="cursor-pointer group p-6 bg-theme-card rounded-lg border-2 border-theme-gray-200 hover:border-theme-primary-500 hover:bg-theme-primary-50 transition-all duration-200 text-left"
                >
                    <div
                        className="flex items-center justify-center w-12 h-12 bg-theme-primary-100 rounded-lg mb-4 group-hover:bg-theme-primary-200">
                        <UploadIcon className="w-6 h-6 text-theme-primary-600"/>
                    </div>
                    <h3 className="text-lg font-semibold text-theme-gray-900 mb-2">Upload Document</h3>
                    <p className="text-theme-gray-600 text-sm">
                        Upload your existing documents for signature and management
                    </p>
                    <div className="mt-4 text-xs text-theme-gray-500">
                        • PDF, DOCX, DOC, TXT
                        • Up to 10MB
                        • Drag & drop support
                    </div>
                </button>
            </div>
        </div>
    );
}