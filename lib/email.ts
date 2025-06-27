import nodemailer from 'nodemailer';
import { Document } from './types/document';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an email with a document attachment and upload link
 * @param document The document to attach
 * @param signerEmail The email of the signer
 * @param message Optional message to include in the email
 * @param documentBuffer The document buffer to attach
 * @param fileName The name of the document file
 */
export async function sendSignatureRequestEmail(
  document: Document,
  signerEmail: string,
  message?: string,
  documentBuffer?: Buffer,
  fileName?: string
): Promise<boolean> {
  try {
    // Generate a unique upload URL with the document ID
    const uploadUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/upload-signed/${document._id}`;

    // Create the email content with HTML formatting
    const htmlContent = `
      <h2>Document Signature Request</h2>
      <p>You have received a request to sign the document: <strong>${document.title}</strong></p>
      ${message ? `<p>Message from requester: ${message}</p>` : ''}
      <p>Please review the attached document, sign it, and upload the signed version using the button below:</p>
      <div style="margin: 20px 0;">
        <a href="${uploadUrl}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          UPLOAD SIGNED DOCUMENT
        </a>
      </div>
      <p>Thank you!</p>
    `;

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: signerEmail,
      subject: `Signature Request: ${document.title}`,
      html: htmlContent,
      attachments: documentBuffer && fileName ? [
        {
          filename: fileName,
          content: documentBuffer
        }
      ] : []
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending signature request email:', error);
    return false;
  }
}