"use client";
import React, {useRef, useState} from 'react';
import {CheckCircleIcon, FileIcon, UploadIcon, XIcon} from 'lucide-react';
import {Document} from "@/lib/types/document";

interface FileUploadStepProps {
    onUploadSuccess: (document: Document) => void;
    onBack: () => void;
}

export default function FileUploadStep({onUploadSuccess, onBack}: FileUploadStepProps) {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState<string>('');
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>('');
    const [dragActive, setDragActive] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validateFile = (file: File): string | null => {
        if (!allowedTypes.includes(file.type)) {
            return 'Unsupported file type. Please upload PDF, DOCX, DOC, or TXT files.';
        }
        if (file.size > maxSize) {
            return 'File size too large. Maximum size is 10MB.';
        }
        return null;
    };

    const handleFileSelect = (selectedFile: File) => {
        const error = validateFile(selectedFile);
        if (error) {
            setUploadError(error);
            return;
        }

        setFile(selectedFile);
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, '')); // Remove file extension
        setUploadError('');
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);

            const response = await fetch('/api/documents/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const document = await response.json();
            onUploadSuccess(document);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setTitle('');
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-theme-card rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-theme-gray-900 mb-6">Upload Document</h2>

                {!file ? (
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            dragActive
                                ? 'border-theme-primary-500 bg-theme-primary-50'
                                : 'border-theme-gray-300 hover:border-theme-primary-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <UploadIcon className="w-12 h-12 text-theme-gray-400 mx-auto mb-4"/>
                        <p className="text-lg font-medium text-theme-gray-900 mb-2">
                            Drop your file here, or{' '}
                            <button
                                type="button"
                                className="text-theme-primary-600 hover:text-theme-primary-700 underline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                browse
                            </button>
                        </p>
                        <p className="text-sm text-theme-gray-500 mb-4">
                            Supports PDF, DOCX, DOC, and TXT files up to 10MB
                        </p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx,.doc,.txt"
                            onChange={handleFileInputChange}
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-theme-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <FileIcon className="w-8 h-8 text-theme-primary-600"/>
                                <div>
                                    <p className="font-medium text-theme-gray-900">{file.name}</p>
                                    <p className="text-sm text-theme-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={removeFile}
                                className="p-1 text-theme-gray-400 hover:text-theme-gray-600 transition-colors"
                            >
                                <XIcon className="w-5 h-5"/>
                            </button>
                        </div>

                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-theme-gray-700 mb-2">
                                Document Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border border-theme-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary-500 focus:border-theme-primary-500"
                                placeholder="Enter document title"
                            />
                        </div>
                    </div>
                )}

                {uploadError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{uploadError}</p>
                    </div>
                )}

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 text-theme-gray-700 bg-theme-gray-100 hover:bg-theme-gray-200 rounded-md transition-colors"
                        disabled={isUploading}
                    >
                        Back
                    </button>

                    {file && (
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={isUploading || !title.trim()}
                            className="px-6 py-2 bg-theme-primary-600 hover:bg-theme-primary-700 disabled:bg-theme-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center space-x-2"
                        >
                            {isUploading ? (
                                <>
                                    <div
                                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Uploading...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircleIcon className="w-4 h-4"/>
                                    <span>Upload Document</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}