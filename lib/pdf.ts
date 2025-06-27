import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import os from 'os';
import {PDFDocument} from 'pdf-lib';
import libre from 'libreoffice-convert';

export async function convertDocxToPdfWithSignature(
    docxBytes: ArrayBuffer,
    signatureDataUrl: string,
    width: number = 200,
    height: number = 100
): Promise<Uint8Array> {
    try {
        // Create temporary files for processing
        const tempDir = os.tmpdir();
        const docxFilePath = path.join(tempDir, `${uuidv4()}.docx`);
        const pdfFilePath = path.join(tempDir, `${uuidv4()}.pdf`);

        // Write the DOCX bytes to a temporary file
        await fs.writeFile(docxFilePath, Buffer.from(docxBytes));

        // Read the file for conversion
        const docxBuffer = await fs.readFile(docxFilePath);

        // Convert DOCX to PDF using LibreOffice
        const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
            libre.convert(docxBuffer, '.pdf', undefined, (err, done) => {
                if (err) {
                    reject(new Error(`LibreOffice conversion failed: ${err.message}`));
                } else {
                    resolve(done);
                }
            });
        });

        const pdfArrayBuffer = new ArrayBuffer(pdfBuffer.length);
        const pdfView = new Uint8Array(pdfArrayBuffer);
        pdfView.set(pdfBuffer);

        // Write the PDF to a temporary file
        await fs.writeFile(pdfFilePath, pdfBuffer);

        // Add signature to the PDF
        const pdfDoc = await PDFDocument.load(pdfArrayBuffer);
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Extract the base64 data from the data URL
        const signatureBase64 = signatureDataUrl.split(',')[1];
        const signatureBytes = Buffer.from(signatureBase64, 'base64');

        // Embed the signature image
        const signatureImage = await pdfDoc.embedPng(signatureBytes);

        // Get page dimensions
        const {width: pageWidth} = firstPage.getSize();

        // Calculate position for signature above the "........................" text
        // Position it at the bottom right of the page, above where the signature line would be
        const signatureX = pageWidth - width - 5; // Align to right with some margin
        const signatureY = 110; // Position from bottom of page, above the signature line

        // Add the signature to the PDF
        firstPage.drawImage(signatureImage, {
            x: signatureX,
            y: signatureY,
            width: width,
            height: height,
        });

        // Save the PDF with the signature
        const signedPdfBytes = await pdfDoc.save();

        // Clean up temporary files
        await fs.unlink(docxFilePath);
        await fs.unlink(pdfFilePath);

        return new Uint8Array(signedPdfBytes);
    } catch (error) {
        console.error('Error converting DOCX to PDF with signature:', error);
        throw new Error('Failed to convert document and add signature');
    }
}
