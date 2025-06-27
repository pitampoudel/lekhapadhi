export interface Document {
    _id?: string;
    title: string;
    type: string;
    status: DocumentStatus;
    userEmail: string;
    createdAt: string;
    publicUrl: string;
    signatureRequest?: SignatureRequest;
    signedDocumentUrl?: string;
}

export interface SignatureRequest {
    requestedAt: string;
    requestedToEmail: string;
    message?: string;
}

export enum DocumentStatus {
    CREATED = 'Created',
    SIGNED = 'Signed',
    REJECTED = 'Rejected',
    PENDING_SIGNATURE = 'Pending Signature'
}