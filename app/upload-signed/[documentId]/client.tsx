"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignatureCanvas from '@/app/components/SignatureCanvas';

export default function UploadSignedDocumentPage({ params }: { params: { documentId: string } }) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [documentTitle, setDocumentTitle] = useState<string | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);
  const [signMethod, setSignMethod] = useState<'upload' | 'digital'>('upload');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const router = useRouter();

  // Get the document ID from the URL
  const { documentId } = params;

  // Fetch document details to show the title
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`/api/documents/${documentId}`);
        if (response.ok) {
          const document = await response.json();
          setDocumentTitle(document.title);
          setDocumentUrl(document.publicUrl); // Store the document URL for digital signing
        } else {
          setError('Document not found or you do not have permission to access it.');
        }
      } catch (err) {
        console.error('Error fetching document:', err);
        setError('Failed to load document details.');
      }
    };

    if (documentId) {
      fetchDocument();
    }
  }, [documentId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check if file is PDF
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      setIsSubmitting(true);
      setError(null);

      let response;

      if (signMethod === 'upload') {
        if (!file) {
          setError('Please select a PDF file to upload');
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('documentId', documentId);

        response = await fetch('/api/documents/upload-signed', {
          method: 'POST',
          body: formData,
        });
      } else {
        // Digital signing
        if (!signatureDataUrl) {
          setError('Please draw your signature');
          setIsSubmitting(false);
          return;
        }

        if (!documentUrl) {
          setError('Document URL not found');
          setIsSubmitting(false);
          return;
        }

        response = await fetch('/api/documents/digital-sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            documentId,
            signatureDataUrl,
            documentUrl
          }),
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to ${signMethod === 'upload' ? 'upload' : 'digitally sign'} document`);
      }

      setSuccess(true);
      // Clear the form
      setFile(null);
      setSignatureDataUrl(null);

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (err) {
      console.error(`Error ${signMethod === 'upload' ? 'uploading' : 'digitally signing'} document:`, err);
      setError(`Failed to ${signMethod === 'upload' ? 'upload' : 'digitally sign'} document. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-light dark:bg-theme-dark-900 flex items-center justify-center p-4">
      <div className="bg-theme-card dark:bg-theme-dark-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-theme-gray-900 dark:text-theme-gray-100 mb-6">
          Sign Document
        </h1>

        {success ? (
          <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-md mb-4">
            <p>Document uploaded successfully! You will be redirected to the home page.</p>
          </div>
        ) : (
          <>
            {documentTitle ? (
              <p className="mb-4 text-theme-gray-700 dark:text-theme-gray-300">
                Please upload the signed version of: <strong>{documentTitle}</strong>
              </p>
            ) : error ? (
              <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-md mb-4">
                <p>{error}</p>
              </div>
            ) : (
              <p className="mb-4 text-theme-gray-700 dark:text-theme-gray-300">Loading document details...</p>
            )}

            {documentTitle && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex space-x-4 mb-4">
                    <button
                      type="button"
                      onClick={() => setSignMethod('upload')}
                      className={`px-4 py-2 rounded-md ${
                        signMethod === 'upload'
                          ? 'bg-theme-primary-600 dark:bg-theme-primary-700 text-theme-light'
                          : 'bg-theme-gray-200 dark:bg-theme-dark-700 text-theme-gray-700 dark:text-theme-gray-300'
                      }`}
                    >
                      Upload Signed Document
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignMethod('digital')}
                      className={`px-4 py-2 rounded-md ${
                        signMethod === 'digital'
                          ? 'bg-theme-primary-600 dark:bg-theme-primary-700 text-theme-light'
                          : 'bg-theme-gray-200 dark:bg-theme-dark-700 text-theme-gray-700 dark:text-theme-gray-300'
                      }`}
                    >
                      Sign Digitally
                    </button>
                  </div>

                  {signMethod === 'upload' ? (
                    <>
                      <label className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                        Signed PDF Document
                      </label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-theme-gray-200 dark:border-theme-dark-700 rounded-md bg-theme-light dark:bg-theme-dark-800 text-theme-gray-900 dark:text-theme-gray-100"
                        accept="application/pdf"
                      />
                      <p className="text-xs text-theme-gray-500 dark:text-theme-gray-400 mt-1">
                        Please upload the signed document in PDF format
                      </p>
                    </>
                  ) : (
                    <>
                      <label className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                        Draw Your Signature
                      </label>
                      <SignatureCanvas
                        onSignatureChange={setSignatureDataUrl}
                        width={450}
                        height={200}
                      />
                      <p className="text-xs text-theme-gray-500 dark:text-theme-gray-400 mt-1">
                        Draw your signature above. The signature will be added to the document and converted to PDF format.
                      </p>
                    </>
                  )}
                </div>

                {error && (
                  <div className="mb-4 text-theme-error-500 dark:text-theme-error-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-theme-success-600 dark:bg-theme-success-700 text-theme-light rounded-md hover:bg-theme-success-700 dark:hover:bg-theme-success-800"
                    disabled={isSubmitting || (signMethod === 'upload' ? !file : !signatureDataUrl)}
                  >
                    {isSubmitting
                      ? (signMethod === 'upload' ? 'Uploading...' : 'Signing...')
                      : (signMethod === 'upload' ? 'Upload Document' : 'Sign Document')}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
