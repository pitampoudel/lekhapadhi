import {Collection, Db, ObjectId} from 'mongodb';
import clientPromise from '@/lib/mongodb';
import {Document, DocumentStatus} from '@/lib/types/document';

async function getCollection(): Promise<Collection<Document>> {
    const client = await clientPromise;
    const db: Db = client.db('lekhapadi');
    return db.collection<Document>('documents');
}

export async function getDocumentsByUser(userEmail: string): Promise<Document[]> {
    const collection = await getCollection();
    return collection
        .find({userEmail})
        .sort({createdAt: -1})
        .toArray();
}

export async function createDocument(document: Document): Promise<Document> {
    const collection = await getCollection();
    const result = await collection.insertOne(document);
    return {...document, _id: result.insertedId.toString()};
}

export async function getDocumentById(id: string): Promise<Document | null> {
    const collection = await getCollection();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await collection.findOne({ _id: new ObjectId(id) } as any);
}

export async function updateDocument(id: string, update: Partial<Document>): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.updateOne(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { _id: new ObjectId(id) } as any,
        {$set: update}
    );
    return result.modifiedCount > 0;
}

export async function requestSignature(
    documentId: string,
    signerEmail: string,
    message?: string
): Promise<boolean> {
    const document = await getDocumentById(documentId);

    if (!document) {
        throw new Error('Document not found');
    }

    const signatureRequest = {
        requestedAt: new Date().toISOString(),
        requestedToEmail: signerEmail,
        message
    };

    return await updateDocument(documentId, {
        status: DocumentStatus.PENDING_SIGNATURE,
        signatureRequest
    });
}

export async function uploadSignedDocument(documentId: string, signedDocumentUrl: string): Promise<boolean> {
    const document = await getDocumentById(documentId);

    if (!document) {
        throw new Error('Document not found');
    }

    if (!document.signatureRequest) {
        throw new Error('No signature request found for this document');
    }

    return await updateDocument(documentId, {
        status: DocumentStatus.SIGNED,
        signedDocumentUrl
    });
}

export async function deleteDocument(id: string): Promise<boolean> {
    const collection = await getCollection();
    const result = await collection.deleteOne(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { _id: new ObjectId(id) } as any
    );
    return result.deletedCount > 0;
}
