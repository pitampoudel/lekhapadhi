import React, {useState} from "react";
import {Document} from '@/lib/types/document';

interface SignatureRequestModalProps {
    document: Document;
    onClose: () => void;
}

export function SignatureRequestModal({document, onClose}: SignatureRequestModalProps) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError('email is required');
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            const response = await fetch('/api/documents/request-signature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    documentId: document._id,
                    signerEmail: email,
                    message
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to request signature');
            }

            onClose();
            // Refresh the page to show updated document status
            window.location.reload();
        } catch (err) {
            console.error('Error requesting signature:', err);
            setError('Failed to request signature. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-theme-light dark:bg-theme-dark-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-theme-gray-900 dark:text-theme-gray-100 mb-4">Request Signature</h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                            Signer&#39;s Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-theme-gray-200 dark:border-theme-dark-700 rounded-md bg-theme-light dark:bg-theme-dark-800 text-theme-gray-900 dark:text-theme-gray-100"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-theme-gray-600 dark:text-theme-gray-400 mb-1">
                            Message (Optional)
                        </label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 py-2 border border-theme-gray-200 dark:border-theme-dark-700 rounded-md bg-theme-light dark:bg-theme-dark-800 text-theme-gray-900 dark:text-theme-gray-100"
                            placeholder="Add a message for the signer"
                            rows={3}
                        />
                    </div>

                    {error && (
                        <div className="mb-4 text-theme-error-500 dark:text-theme-error-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-theme-gray-200 dark:border-theme-dark-700 rounded-md text-theme-gray-700 dark:text-theme-gray-300 bg-theme-light dark:bg-theme-dark-800"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-theme-primary-600 dark:bg-theme-primary-700 text-theme-light rounded-md hover:bg-theme-primary-700 dark:hover:bg-theme-primary-800"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
