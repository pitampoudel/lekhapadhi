import {NextResponse} from 'next/server';
import {auth} from '@/auth';
import {createDocument, getDocumentsByUser} from '@/lib/db/documents';
import {Document, DocumentStatus} from '@/lib/types/document';
import * as fs from 'fs';
import * as path from 'path';
import * as docx from 'docx';
import {v4 as uuidv4} from 'uuid';
import generateWordDocument from "@/lib/docx";

export async function GET() {
    try {
        const session = await auth();
        const userEmail = session?.user?.email as string;
        return NextResponse.json(await getDocumentsByUser(userEmail));
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json(
            {error: 'Failed to fetch documents'},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await auth();
        const userEmail = session?.user?.email as string;

        const {docType, formData} = await request.json();

        if (!docType || !formData) {
            return NextResponse.json(
                {error: 'Missing required fields'},
                {status: 400}
            );
        }

        const filename = `${docType.toLowerCase()}_${uuidv4()}.docx`;

        const publicDir = process.env.NEXT_PUBLIC_BASE_URL as string;
        const documentsDir = path.join(publicDir, 'documents');

        if (!fs.existsSync(documentsDir)) {
            fs.mkdirSync(documentsDir, {recursive: true});
        }

        const doc = await generateWordDocument(docType, formData);

        const filePath = path.join(documentsDir, filename);
        const buffer = await docx.Packer.toBuffer(doc);
        fs.writeFileSync(filePath, buffer);

        const publicUrl = `/documents/${filename}`;

        const document: Document = {
            title: formData.documentName || `${docType} Document`, // Use user-provided name or fallback to auto-generated
            type: docType,
            status: DocumentStatus.CREATED,
            userEmail,
            createdAt: new Date().toISOString(),
            publicUrl
        };

        const createdDocument = await createDocument(document);
        return NextResponse.json(createdDocument);
    } catch (error) {
        console.error('Error creating document:', error);
        return NextResponse.json(
            {error: 'Failed to create document'},
            {status: 500}
        );
    }
}
