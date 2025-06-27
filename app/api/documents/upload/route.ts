import {NextRequest, NextResponse} from 'next/server';
import {auth} from '@/auth';
import {createDocument} from '@/lib/db/documents';
import {Document, DocumentStatus} from '@/lib/types/document';
import {uploadToGCS} from '@/lib/storage';
import {v4 as uuidv4} from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const userEmail = session?.user?.email as string;

        if (!userEmail) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;

        if (!file) {
            return NextResponse.json(
                {error: 'No file provided'},
                {status: 400}
            );
        }

        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'text/plain'
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                {error: 'Unsupported file type. Please upload PDF, DOCX, DOC, or TXT files.'},
                {status: 400}
            );
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                {error: 'File size too large. Maximum size is 10MB.'},
                {status: 400}
            );
        }

        // Convert file to buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Generate unique filename
        const fileExtension = file.name.split('.').pop();
        const filename = `uploaded_${uuidv4()}.${fileExtension}`;

        // Upload to Google Cloud Storage
        const publicUrl = await uploadToGCS(buffer, filename, file.type);

        // Determine document type based on file extension
        const getDocumentType = (filename: string): string => {
            const ext = filename.split('.').pop()?.toLowerCase();
            switch (ext) {
                case 'pdf':
                    return 'PDF Document';
                case 'docx':
                case 'doc':
                    return 'Word Document';
                default:
                    return 'Document';
            }
        };

        const document: Document = {
            title: title || file.name,
            type: getDocumentType(file.name),
            status: DocumentStatus.CREATED,
            userEmail,
            createdAt: new Date().toISOString(),
            publicUrl
        };

        const createdDocument = await createDocument(document);
        return NextResponse.json(createdDocument);
    } catch (error) {
        console.error('Error uploading document:', error);
        return NextResponse.json(
            {error: 'Failed to upload document'},
            {status: 500}
        );
    }
}