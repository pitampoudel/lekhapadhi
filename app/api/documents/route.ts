import {NextResponse} from 'next/server';
import {auth} from '@/auth';
import {getDocumentsByUser} from '@/lib/db/documents';

export async function GET() {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                {error: 'You must be signed in to view your documents'},
                {status: 401}
            );
        }

        // Get the user's email from the session
        const userEmail = session.user.email;

        if (!userEmail) {
            return NextResponse.json(
                {error: 'User email not found in session'},
                {status: 400}
            );
        }

        // Get documents for the current user using our typed database function
        const documents = await getDocumentsByUser(userEmail);

        // Return the documents
        return NextResponse.json(documents);
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            {error: 'Failed to fetch documents'},
            {status: 500}
        );
    }
}
