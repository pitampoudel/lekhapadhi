'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GeneratePage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to home page with generate tab active
        router.replace('/?tab=generate');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
    );
}
