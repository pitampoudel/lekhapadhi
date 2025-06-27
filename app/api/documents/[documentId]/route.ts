import {NextRequest, NextResponse} from 'next/server';
import {getDocumentById} from '@/lib/db/documents';
import {auth} from '@/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ documentId: string }> }
) {
    const resolvedParams = await params;
    try {
        const documentId = resolvedParams.documentId;

        if (!documentId) {
            return NextResponse.json(
                {error: 'Document ID is required'},
                {status: 400}
            );
        }

        // Get the document
        const document = await getDocumentById(documentId);

        if (!document) {
            return NextResponse.json(
                {error: 'Document not found'},
                {status: 404}
            );
        }

        // Get the current user's email
        const session = await auth();
        const userEmail = session?.user?.email;

        // If user is logged in, check if they have permission to access this document
        if (userEmail && document.userEmail !== userEmail && 
            (!document.signatureRequest || document.signatureRequest.requestedToEmail !== userEmail)) {
            return NextResponse.json(
                {error: 'You do not have permission to access this document'},
                {status: 403}
            );
        }

        return NextResponse.json(document);
    } catch (error) {
        console.error('Error getting document:', error);
        return NextResponse.json(
            {error: 'Failed to get document'},
            {status: 500}
        );
    }
}
