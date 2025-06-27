import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GCP_BUCKET_NAME || '';

/**
 * Upload a file to Google Cloud Storage
 * @param fileBuffer - The file buffer to upload
 * @param fileName - The name of the file
 * @param contentType - The content type of the file
 * @returns The public URL of the uploaded file
 */
export async function uploadToGCS(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  // Create a unique file name to avoid collisions
  const uniqueFileName = `${fileName.split('.')[0]}_${uuidv4()}.${fileName.split('.').pop()}`;
  
  // Get a reference to the bucket
  const bucket = storage.bucket(bucketName);
  
  // Create a file object
  const file = bucket.file(uniqueFileName);
  
  // Upload the file
  await file.save(fileBuffer, {
    contentType,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });
  
  // Return the public URL
  return `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;
}

/**
 * Download a file from Google Cloud Storage
 * @param fileUrl - The URL of the file to download
 * @returns The file buffer
 */
export async function downloadFromGCS(fileUrl: string): Promise<Buffer> {
  // Extract the file name from the URL
  const fileName = fileUrl.split('/').pop() || '';
  
  // Get a reference to the bucket
  const bucket = storage.bucket(bucketName);
  
  // Get a reference to the file
  const file = bucket.file(fileName);
  
  // Download the file
  const [fileContent] = await file.download();
  
  return fileContent;
}