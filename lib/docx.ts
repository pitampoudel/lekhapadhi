import * as docx from "docx";
import * as fs from "fs";
import * as path from "path";

export default function generateWordDocument(docType: string, formData: any): docx.Document {
    // Generate a unique reference number
    const refNumber = `${Math.floor(Math.random() * 1000)}-${new Date().getFullYear()}/${new Date().getMonth() + 1}`;

    // Format current date in Nepali style (can be enhanced with actual Nepali date conversion)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    // Create document based on document type
    if (docType === "citizenship-sifaris") {
        return createCitizenshipRecommendation(formData, refNumber, formattedDate);
    }
    throw new Error("Invalid docType: " + docType);
}

function createCitizenshipRecommendation(formData: any, refNumber: string, formattedDate: string): docx.Document {
    // Add logo image - Note: SVG doesn't work well with docx, but we'll try to include it
    // In a production environment, you would convert the SVG to PNG/JPG for better compatibility
    const logoPath = path.join(process.cwd(), 'public', 'ward-logo.svg');

    // Create image object if the logo file exists
    let logoImage;
    try {
        if (fs.existsSync(logoPath)) {
            const logoData = fs.readFileSync(logoPath);
            logoImage = new docx.ImageRun({
                data: logoData,
                transformation: {
                    width: 100,
                    height: 100,
                }
            });
        }
    } catch (error) {
        console.error("Error loading logo image:", error);
        // Continue without the logo if there's an error
    }

    // Create the document with proper formatting
    return new docx.Document({
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: 1000,
                        right: 1000,
                        bottom: 1000,
                        left: 1000,
                    },
                },
            },
            children: [
                // Letterhead with logo (if available)
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: logoImage ? [logoImage] : [],
                    spacing: {
                        after: 200,
                    },
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "नेपाल सरकार",
                            bold: true,
                            size: 32,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "गृह मन्त्रालय",
                            bold: true,
                            size: 28,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "जिल्ला प्रशासन कार्यालय",
                            bold: true,
                            size: 28,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "गाउँ विकास समिति",
                            bold: true,
                            size: 28,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "वडा कार्यालय",
                            bold: true,
                            size: 28,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: `वडा नं. ${formData.wardNo}`,
                            bold: true,
                            size: 28,
                        }),
                    ],
                }),

                // Divider line
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "══════════════════════════════════════════",
                            bold: true,
                        }),
                    ],
                }),

                // Reference number and date
                new docx.Paragraph({
                    alignment: docx.AlignmentType.RIGHT,
                    children: [
                        new docx.TextRun({
                            text: `पत्र संख्या: ${refNumber}`,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.RIGHT,
                    children: [
                        new docx.TextRun({
                            text: `मिति: ${formattedDate}`,
                        }),
                    ],
                }),

                // Subject
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "विषय: नागरिकता सिफारिस सम्बन्धमा।",
                            bold: true,
                            size: 28,
                        }),
                    ],
                    spacing: {
                        before: 400,
                        after: 400,
                    },
                }),

                // Addressee
                new docx.Paragraph({
                    alignment: docx.AlignmentType.LEFT,
                    children: [
                        new docx.TextRun({
                            text: "श्री जिल्ला प्रशासन कार्यालय,",
                            size: 24,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.LEFT,
                    children: [
                        new docx.TextRun({
                            text: "जिल्ला।",
                            size: 24,
                        }),
                    ],
                    spacing: {
                        after: 400,
                    },
                }),

                // Letter body
                new docx.Paragraph({
                    alignment: docx.AlignmentType.LEFT,
                    children: [
                        new docx.TextRun({
                            text: "महोदय,",
                            size: 24,
                        }),
                    ],
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.LEFT,
                    children: [
                        new docx.TextRun({
                            text: `प्रस्तुत विषयमा यस वडा नं. ${formData.wardNo} स्थायी ठेगाना भएका श्री ${formData.fatherName} तथा श्रीमती ${formData.motherName} को ${formData.citizenshipType === 'birthCitizenship' ? 'जन्मको आधारमा' : 'वंशजको आधारमा'} छोरा/छोरी मिति ${formData.dateOfBirth} मा जन्म भएको श्री ${formData.fullName} लाई नेपाली नागरिकताको प्रमाण-पत्र प्रदान गरिदिनुहुन सिफारिस साथ अनुरोध गर्दछु।`,
                            size: 24,
                        }),
                    ],
                    spacing: {
                        before: 200,
                        after: 200,
                    },
                }),

                // Additional details if provided
                ...(formData.additionalDetails ? [
                    new docx.Paragraph({
                        alignment: docx.AlignmentType.LEFT,
                        children: [
                            new docx.TextRun({
                                text: `अतिरिक्त जानकारी: ${formData.additionalDetails}`,
                                size: 24,
                            }),
                        ],
                        spacing: {
                            before: 200,
                            after: 400,
                        },
                    }),
                ] : []),

                // Signature section
                new docx.Paragraph({
                    alignment: docx.AlignmentType.RIGHT,
                    children: [
                        new docx.TextRun({
                            text: "........................",
                            size: 24,
                        }),
                    ],
                    spacing: {
                        before: 800,
                    },
                }),
                new docx.Paragraph({
                    alignment: docx.AlignmentType.RIGHT,
                    children: [
                        new docx.TextRun({
                            text: "वडा अध्यक्ष",
                            size: 24,
                        }),
                    ],
                }),

                // Footer with stamp placeholder
                new docx.Paragraph({
                    alignment: docx.AlignmentType.CENTER,
                    children: [
                        new docx.TextRun({
                            text: "(कार्यालयको छाप)",
                            italics: true,
                            size: 20,
                        }),
                    ],
                    spacing: {
                        before: 400,
                    },
                }),
            ],
        }],
    });
}
