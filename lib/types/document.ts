export interface Document {
    _id?: string;
    title: string;
    type: string;
    status: DocumentStatus;
    userEmail: string;
    createdAt: string;
    publicUrl: string;
    srcUrl: string;
}

export enum DocumentStatus {
    SIGNED = 'Signed',
    UNDER_REVIEW = 'Under Review',
    PENDING = 'Pending',
    REJECTED = 'Rejected'
}