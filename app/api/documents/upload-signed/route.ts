import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadSignedDocument } from '@/lib/db/documents';
import { v4 as uuidv4 } from 'uuid';
import { uploadToGCS } from '@/lib/storage';

export async function POST(request: Request) {
    try {
        const session = await auth();
        const userEmail = session?.user?.email as string;

        if (!userEmail) {
            return NextResponse.json(
                { error: 'Authentication required' },
                { status: 401 }
            );
        }

        // Parse the multipart form data
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const documentId = formData.get('documentId') as string;

        if (!file || !documentId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if file is a PDF
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { error: 'Only PDF files are allowed' },
                { status: 400 }
            );
        }

        // Generate a unique filename
        const filename = `signed_${uuidv4()}.pdf`;

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Upload to Google Cloud Storage
        const signedDocumentUrl = await uploadToGCS(buffer, filename, 'application/pdf');

        // Update the document in the database
        await uploadSignedDocument(documentId, signedDocumentUrl);

        return NextResponse.json({ 
            success: true,
            signedDocumentUrl
        });
    } catch (error) {
        console.error('Error uploading signed document:', error);
        return NextResponse.json(
            { error: 'Failed to upload signed document' },
            { status: 500 }
        );
    }
}
