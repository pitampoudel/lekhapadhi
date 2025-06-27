import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import os from 'os';
import CloudConvert from 'cloudconvert';
import {PDFDocument} from 'pdf-lib';
import {FileResult} from "cloudconvert/built/lib/TasksResource";
import fetch from 'node-fetch';

const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY || '');

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

        // Read the file for upload
        const docxBuffer = await fs.readFile(docxFilePath);

        // Convert DOCX to PDF using CloudConvert
        const job = await cloudConvert.jobs.create({
            tasks: {
                'import-docx': {
                    operation: 'import/upload'
                },
                'convert-to-pdf': {
                    operation: 'convert',
                    input: 'import-docx',
                    output_format: 'pdf',
                    engine: 'office'
                },
                'export-pdf': {
                    operation: 'export/url',
                    input: 'convert-to-pdf'
                }
            }
        });

        // Upload the DOCX file
        const uploadTask = job.tasks.filter(task => task.name === 'import-docx')[0];
        await cloudConvert.tasks.upload(uploadTask, docxBuffer, 'document.docx');

        // Wait for the job to finish
        const jobResult = await cloudConvert.jobs.wait(job.id);

        // Get the export task
        const exportTask = jobResult.tasks.filter(task => task.name === 'export-pdf')[0];
        const file = exportTask.result?.files?.[0] as FileResult;

        // Check if file.url is defined
        if (!file || !file.url) {
            throw new Error('PDF conversion failed: URL not available');
        }

        // Download the converted PDF
        const pdfResponse = await fetch(file.url);
        const pdfArrayBuffer = await pdfResponse.arrayBuffer();

        // Write the PDF to a temporary file
        await fs.writeFile(pdfFilePath, Buffer.from(pdfArrayBuffer));

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
        const signatureX = pageWidth - width - 20; // Align to right with some margin
        const signatureY = 250; // Position from bottom of page, above the signature line

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
