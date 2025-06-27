import {NextResponse} from 'next/server';
import {getDocumentById, requestSignature} from '@/lib/db/documents';
import {sendSignatureRequestEmail} from '@/lib/email';
import {auth} from '@/auth';
import fetch from 'node-fetch';

export async function POST(request: Request) {
    try {
        const {documentId, signerEmail, message} = await request.json();

        if (!documentId || !signerEmail) {
            return NextResponse.json(
                {error: 'Missing required fields'},
                {status: 400}
            );
        }

        // Get the session to check the current user
        const session = await auth();
        const userEmail = session?.user?.email as string;

        if (!userEmail) {
            return NextResponse.json(
                {error: 'User not authenticated'},
                {status: 401}
            );
        }

        // Request signature in the database
        await requestSignature(documentId, signerEmail, message);

        // Get the document details
        const document = await getDocumentById(documentId);

        if (!document) {
            return NextResponse.json(
                {error: 'Document not found'},
                {status: 404}
            );
        }

        // Fetch the document file
        let documentBuffer: Buffer | undefined;
        let fileName: string | undefined;

        try {
            // Fetch the document from the public URL
            const response = await fetch(document.publicUrl);

            if (response.ok) {
                // Get the document as a buffer
                const arrayBuffer = await response.arrayBuffer();
                documentBuffer = Buffer.from(arrayBuffer);

                // Generate a filename
                fileName = `${document.title.replace(/\s+/g, '_')}.docx`;
            }
        } catch (fetchError) {
            console.error('Error fetching document file:', fetchError);
            // Continue without attachment if there's an error
        }

        // Send email with document attached
        await sendSignatureRequestEmail(
            document,
            signerEmail,
            message,
            documentBuffer,
            fileName
        );

        return NextResponse.json({success: true});
    } catch (error) {
        console.error('Error requesting signature:', error);
        return NextResponse.json(
            {error: 'Failed to request signature'},
            {status: 500}
        );
    }
}
