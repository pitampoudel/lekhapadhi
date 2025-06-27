import * as docx from "docx";
import {enhanceDocumentContent} from "./gemini";
import { 
    FormData, 
    CitizenshipFormData, 
    BirthRegistrationFormData, 
    ResidenceFormData, 
    MarriageFormData, 
    RelationshipFormData 
} from "./types/formData";

export default async function generateWordDocument(docType: string, formData: FormData): Promise<docx.Document> {
    // Generate a unique reference number
    const refNumber = `${Math.floor(Math.random() * 1000)}-${new Date().getFullYear()}/${new Date().getMonth() + 1}`;

    // Format current date in Nepali style (can be enhanced with actual Nepali date conversion)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

    // Create document based on document type
    switch (docType) {
        case "citizenship-sifaris":
            return await createCitizenshipRecommendation(formData as CitizenshipFormData, refNumber, formattedDate);
        case "birth-sifaris":
            return await createBirthRegistrationRecommendation(formData as BirthRegistrationFormData, refNumber, formattedDate);
        case "residence-sifaris":
            return await createResidenceRecommendation(formData as ResidenceFormData, refNumber, formattedDate);
        case "marriage-sifaris":
            return await createMarriageRecommendation(formData as MarriageFormData, refNumber, formattedDate);
        case "relationship-certificate-sifaris":
            return await createRelationshipRecommendation(formData as RelationshipFormData, refNumber, formattedDate);
        default:
            throw new Error("Invalid docType: " + docType);
    }
}

// Function to create a standard document with common elements
async function createStandardDocument(
    children: docx.Paragraph[],
    formData: FormData,
    refNumber: string,
    formattedDate: string
): Promise<docx.Document> {
    // Add logo image from remote URL
    const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Emblem_of_Nepal.svg/1200px-Emblem_of_Nepal.svg.png";

    // Create image object
    let logoImage;
    try {
        // In Next.js, fetch is available in both client and server components
        const response = await fetch(logoUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch logo: ${response.status} ${response.statusText}`);
        }

        // Convert the response to an ArrayBuffer
        const logoData = await response.arrayBuffer();

        logoImage = new docx.ImageRun({
            data: Buffer.from(logoData),
            transformation: {
                width: 100,
                height: 100,
            }
        });
    } catch (error) {
        console.error("Error loading logo image:", error);
        // Continue without the logo if there's an error
    }

    // Standard header elements
    const standardHeader = [
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
    ];

    // Standard footer elements
    const standardFooter = [
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
    ];

    // Combine all elements
    const allChildren = [...standardHeader, ...children, ...standardFooter];

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
            children: allChildren,
        }],
    });
}

async function createCitizenshipRecommendation(formData: CitizenshipFormData, refNumber: string, formattedDate: string): Promise<docx.Document> {
    // Extract the original content for enhancement
    const originalContent = `प्रस्तुत विषयमा यस वडा नं. ${formData.wardNo} स्थायी ठेगाना भएका श्री ${formData.fatherName} तथा श्रीमती ${formData.motherName} को ${formData.citizenshipType === 'birthCitizenship' ? 'जन्मको आधारमा' : 'वंशजको आधारमा'} छोरा/छोरी मिति ${formData.dateOfBirth} मा जन्म भएको श्री ${formData.fullName} लाई नेपाली नागरिकताको प्रमाण-पत्र प्रदान गरिदिनुहुन सिफारिस साथ अनुरोध गर्दछु।`;

    // Use Gemini to enhance the content
    const enhancedContent = await enhanceDocumentContent("citizenship-sifaris", originalContent, formData);

    // Create document content specific to citizenship recommendation
    const documentContent = [
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
                    text: enhancedContent,
                    size: 24,
                }),
            ],
            spacing: {
                before: 200,
                after: 200,
            },
        })
    ];

    // Use the standard document structure
    return await createStandardDocument(documentContent, formData, refNumber, formattedDate);
}

async function createBirthRegistrationRecommendation(formData: BirthRegistrationFormData, refNumber: string, formattedDate: string): Promise<docx.Document> {
    // Extract the original content for enhancement
    const originalContent = `प्रस्तुत विषयमा यस वडा नं. ${formData.wardNo} स्थायी ठेगाना भएका श्री ${formData.fatherName} तथा श्रीमती ${formData.motherName} को ${formData.gender === 'male' ? 'छोरा' : formData.gender === 'female' ? 'छोरी' : 'सन्तान'} श्री ${formData.fullName} को जन्म मिति ${formData.dateOfBirth} मा ${formData.birthPlace} मा भएको हुँदा निजको जन्मदर्ता गरिदिनुहुन सिफारिस साथ अनुरोध गर्दछु।`;

    // Use Gemini to enhance the content
    const enhancedContent = await enhanceDocumentContent("birth-sifaris", originalContent, formData);

    // Create document content specific to birth registration
    const documentContent = [
        // Subject
        new docx.Paragraph({
            alignment: docx.AlignmentType.CENTER,
            children: [
                new docx.TextRun({
                    text: "विषय: जन्मदर्ता सिफारिस सम्बन्धमा।",
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
                    text: "श्री स्थानीय पञ्जिकाधिकारीज्यू,",
                    size: 24,
                }),
            ],
        }),
        new docx.Paragraph({
            alignment: docx.AlignmentType.LEFT,
            children: [
                new docx.TextRun({
                    text: "वडा कार्यालय।",
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
                    text: enhancedContent,
                    size: 24,
                }),
            ],
            spacing: {
                before: 200,
                after: 200,
            },
        })
    ];

    // Use the standard document structure
    return await createStandardDocument(documentContent, formData, refNumber, formattedDate);
}

async function createResidenceRecommendation(formData: ResidenceFormData, refNumber: string, formattedDate: string): Promise<docx.Document> {
    // Extract the original content for enhancement
    const originalContent = `प्रस्तुत विषयमा श्री ${formData.fullName}, श्री ${formData.fatherName} तथा श्रीमती ${formData.motherName} को ${formData.gender === 'male' ? 'छोरा' : formData.gender === 'female' ? 'छोरी' : 'सन्तान'}, स्थायी ठेगाना ${formData.permanentAddress} भएको व्यक्ति मिति ${formData.residingSince} देखि हालसम्म ${formData.currentAddress} मा बसोबास गर्दै आउनुभएको व्यहोरा प्रमाणित गरिन्छ।`;

    // Use Gemini to enhance the content
    const enhancedContent = await enhanceDocumentContent("residence-sifaris", originalContent, formData);

    // Create document content specific to residence recommendation
    const documentContent = [
        // Subject
        new docx.Paragraph({
            alignment: docx.AlignmentType.CENTER,
            children: [
                new docx.TextRun({
                    text: "विषय: बसोबास प्रमाण पत्र सिफारिस सम्बन्धमा।",
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
                    text: "जसलाई सम्बन्धित छ,",
                    size: 24,
                }),
            ],
        }),
        new docx.Paragraph({
            alignment: docx.AlignmentType.LEFT,
            children: [
                new docx.TextRun({
                    text: "सम्बन्धित कार्यालय।",
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
                    text: enhancedContent,
                    size: 24,
                }),
            ],
            spacing: {
                before: 200,
                after: 200,
            },
        })
    ];

    // Use the standard document structure
    return await createStandardDocument(documentContent, formData, refNumber, formattedDate);
}

async function createMarriageRecommendation(formData: MarriageFormData, refNumber: string, formattedDate: string): Promise<docx.Document> {
    // Get marriage type in Nepali
    let marriageTypeNepali = "माग विवाह";
    if (formData.marriageType === 'love') {
        marriageTypeNepali = "प्रेम विवाह";
    } else if (formData.marriageType === 'court') {
        marriageTypeNepali = "अदालती विवाह";
    }

    // Extract the original content for enhancement
    const originalContent = `प्रस्तुत विषयमा यस वडा नं. ${formData.wardNo} स्थायी ठेगाना भएका श्री ${formData.fullName} र श्री/श्रीमती ${formData.spouseName} बीच मिति ${formData.marriageDate} मा ${marriageTypeNepali} भएको हुँदा विवाह दर्ता गरिदिनुहुन सिफारिस साथ अनुरोध गर्दछु।`;

    // Use Gemini to enhance the content
    const enhancedContent = await enhanceDocumentContent("marriage-sifaris", originalContent, formData);

    // Create document content specific to marriage recommendation
    const documentContent = [
        // Subject
        new docx.Paragraph({
            alignment: docx.AlignmentType.CENTER,
            children: [
                new docx.TextRun({
                    text: "विषय: विवाह प्रमाणिकरण सिफारिस सम्बन्धमा।",
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
                    text: "श्री स्थानीय पञ्जिकाधिकारीज्यू,",
                    size: 24,
                }),
            ],
        }),
        new docx.Paragraph({
            alignment: docx.AlignmentType.LEFT,
            children: [
                new docx.TextRun({
                    text: "वडा कार्यालय।",
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
                    text: enhancedContent,
                    size: 24,
                }),
            ],
            spacing: {
                before: 200,
                after: 200,
            },
        })
    ];

    // Use the standard document structure
    return await createStandardDocument(documentContent, formData, refNumber, formattedDate);
}

async function createRelationshipRecommendation(formData: RelationshipFormData, refNumber: string, formattedDate: string): Promise<docx.Document> {
    // Get relationship type in Nepali
    let relationshipNepali = "";
    switch (formData.relationship) {
        case 'father': relationshipNepali = "बुवा"; break;
        case 'mother': relationshipNepali = "आमा"; break;
        case 'son': relationshipNepali = "छोरा"; break;
        case 'daughter': relationshipNepali = "छोरी"; break;
        case 'brother': relationshipNepali = "भाइ"; break;
        case 'sister': relationshipNepali = "बहिनी"; break;
        case 'husband': relationshipNepali = "पति"; break;
        case 'wife': relationshipNepali = "पत्नी"; break;
        default: relationshipNepali = "नाता"; break;
    }

    // Extract the original content for enhancement
    const originalContent = `प्रस्तुत विषयमा यस वडा नं. ${formData.wardNo} स्थायी ठेगाना भएका श्री ${formData.fullName} र श्री ${formData.relatedPersonName} बीच ${relationshipNepali} नाता रहेको व्यहोरा प्रमाणित गरिन्छ।`;

    // Use Gemini to enhance the content
    const enhancedContent = await enhanceDocumentContent("relationship-certificate-sifaris", originalContent, formData);

    // Create document content specific to relationship recommendation
    const documentContent = [
        // Subject
        new docx.Paragraph({
            alignment: docx.AlignmentType.CENTER,
            children: [
                new docx.TextRun({
                    text: "विषय: नाता प्रमाणिकरण सिफारिस सम्बन्धमा।",
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
                    text: "जसलाई सम्बन्धित छ,",
                    size: 24,
                }),
            ],
        }),
        new docx.Paragraph({
            alignment: docx.AlignmentType.LEFT,
            children: [
                new docx.TextRun({
                    text: "सम्बन्धित कार्यालय।",
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
                    text: enhancedContent,
                    size: 24,
                }),
            ],
            spacing: {
                before: 200,
                after: 200,
            },
        })
    ];

    // Use the standard document structure
    return await createStandardDocument(documentContent, formData, refNumber, formattedDate);
}
