import UploadSignedDocumentPage from './client';

// Server Component
export default async function Page({ params }: { params: Promise<{ documentId: string }> }) {
  const resolvedParams = await params;
  return <UploadSignedDocumentPage params={resolvedParams} />;
}
