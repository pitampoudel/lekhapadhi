import {NextRequest, NextResponse} from 'next/server';
import {getDocumentById, deleteDocument} from '@/lib/db/documents';
import {deleteFromGCS} from '@/lib/storage';
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

export async function DELETE(
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

        // Get the current user's email
        const session = await auth();
        const userEmail = session?.user?.email;

        if (!userEmail) {
            return NextResponse.json(
                {error: 'Authentication required'},
                {status: 401}
            );
        }

        // Get the document to check ownership
        const document = await getDocumentById(documentId);

        if (!document) {
            return NextResponse.json(
                {error: 'Document not found'},
                {status: 404}
            );
        }

        // Check if the user owns the document
        if (document.userEmail !== userEmail) {
            return NextResponse.json(
                {error: 'You do not have permission to delete this document'},
                {status: 403}
            );
        }

        // Delete associated files from Google Cloud Storage
        const fileDeletionPromises = [];

        // Delete the original document file
        if (document.publicUrl) {
            fileDeletionPromises.push(deleteFromGCS(document.publicUrl));
        }

        // Delete the signed document file if it exists
        if (document.signedDocumentUrl) {
            fileDeletionPromises.push(deleteFromGCS(document.signedDocumentUrl));
        }

        // Wait for all file deletions to complete (but don't fail if some files can't be deleted)
        if (fileDeletionPromises.length > 0) {
            try {
                await Promise.all(fileDeletionPromises);
                console.log('Successfully deleted associated files from GCS');
            } catch (error) {
                console.warn('Some files could not be deleted from GCS:', error);
                // Continue with document deletion even if file cleanup fails
            }
        }

        // Delete the document from database
        const deleted = await deleteDocument(documentId);

        if (!deleted) {
            return NextResponse.json(
                {error: 'Failed to delete document'},
                {status: 500}
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting document:', error);
        return NextResponse.json(
            {error: 'Failed to delete document'},
            {status: 500}
        );
    }
}
