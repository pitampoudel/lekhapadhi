import {GoogleGenerativeAI} from "@google/generative-ai";

// Initialize the Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || "");

// Get the Gemini Pro model
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

/**
 * Enhances document content using Gemini AI
 * @param docType The type of document
 * @param content The original content to enhance
 * @param formData The form data used to generate the document
 * @returns Enhanced content
 */
export async function enhanceDocumentContent(
  docType: string,
  content: string,
  formData: any
): Promise<string> {
  try {
    // Create a prompt based on the document type and content
    const prompt = createPromptForDocType(docType, content, formData);
    
    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error enhancing content with Gemini:", error);
    // Return original content if there's an error
    return content;
  }
}

/**
 * Creates a prompt for Gemini based on document type
 */
function createPromptForDocType(docType: string, content: string, formData: any): string {
  // Base context for all document types
  const baseContext = `
    You are an expert in Nepali official documents and legal writing.
    You need to enhance the following document content to make it more professional, 
    formal, and comprehensive while maintaining the original meaning and intent.
    Use formal Nepali language appropriate for official documents.
    
    Original content: "${content}"
    
    Document type: ${docType}
    
    Form data: ${JSON.stringify(formData, null, 2)}
    
    Please provide an enhanced version of this content that:
    1. Uses more formal and professional language
    2. Adds appropriate legal references where relevant
    3. Makes the document more comprehensive and detailed
    4. Maintains the original meaning and intent
    5. Follows standard Nepali official document format
    
    Return ONLY the enhanced content in Nepali, without any explanations or notes.
  `;
  
  // Add specific instructions based on document type
  switch (docType) {
    case "citizenship-sifaris":
      return baseContext + `
        For citizenship recommendation, emphasize:
        - The legal basis for citizenship
        - Verification of identity and residence
        - Confirmation of eligibility criteria
      `;
    
    case "birth-sifaris":
      return baseContext + `
        For birth registration recommendation, emphasize:
        - Details about the birth (place, time if available)
        - Family information
        - Importance of timely registration
      `;
    
    case "residence-sifaris":
      return baseContext + `
        For residence certificate, emphasize:
        - Duration of residence
        - Verification of address
        - Purpose of the certificate
      `;
    
    case "marriage-sifaris":
      return baseContext + `
        For marriage verification, emphasize:
        - Details of the marriage ceremony
        - Legal status of the marriage
        - Verification of the relationship
      `;
    
    case "relationship-certificate-sifaris":
      return baseContext + `
        For relationship verification, emphasize:
        - Nature of the relationship
        - Verification of the relationship
        - Purpose of the certificate
      `;
    
    default:
      return baseContext;
  }
}