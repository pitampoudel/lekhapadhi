import {Collection, Db} from 'mongodb';
import clientPromise from '@/lib/mongodb';
import {Document} from '@/lib/types/document';

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
