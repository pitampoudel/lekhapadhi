import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadSignedDocument } from '@/lib/db/documents';
import { v4 as uuidv4 } from 'uuid';
import { uploadToGCS } from '@/lib/storage';
import { fetchDocxFromUrl } from '@/lib/docx';
import { convertDocxToPdfWithSignature } from '@/lib/pdf';

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

        // Parse the JSON request body
        const { documentId, signatureDataUrl, documentUrl, width = 200, height = 100 } = await request.json();

        if (!documentId || !signatureDataUrl || !documentUrl) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Fetch the original DOCX document
        const docxBytes = await fetchDocxFromUrl(documentUrl);

        // Convert DOCX to PDF and add the digital signature
        const signedPdfBytes = await convertDocxToPdfWithSignature(
            docxBytes,
            signatureDataUrl,
            width,
            height
        );

        // Generate a unique filename
        const filename = `digitally_signed_${uuidv4()}.pdf`;

        // Upload to Google Cloud Storage
        const signedDocumentUrl = await uploadToGCS(
            Buffer.from(signedPdfBytes),
            filename,
            'application/pdf'
        );

        // Update the document in the database
        await uploadSignedDocument(documentId, signedDocumentUrl);

        return NextResponse.json({
            success: true,
            signedDocumentUrl
        });
    } catch (error) {
        console.error('Error digitally signing document:', error);
        return NextResponse.json(
            { error: 'Failed to digitally sign document' },
            { status: 500 }
        );
    }
}
