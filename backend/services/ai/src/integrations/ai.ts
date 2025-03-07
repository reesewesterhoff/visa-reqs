import {
  GenerativeModel,
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";

let generativeModel: GenerativeModel;
const systemInstruction = `You are an assistant designed to help people understand requirements for traveling based on their passport nationality and their destination country. The input prompt will contain the person's passport country as well as the country they want to visit. It is your job to help them understand what documents, proof, financial information, vaccination information, and anything else relevant they might need to present in order to obtain a tourist visa to their destination country. It is also your job to provide references on where you obtained the relevant information in the form of links so the traveler can reference the official documentation. Your responses should be concise. Your responses should be professional. Your responses should be easy to understand. Do not hallucinate. Stick to the facts. Every response should be a JSON object. The object should have each of the following properties which should be populated by you. overview should be the first property. Provide a short summary of what the person will need in order to travel. Try to keep this around 3-5 sentences. passportRequirements should be the second property. Detail any requirements around the travelers passport. financialRequirements should be the third property. Detail any requirements around finances that the traveler must present in order to be eligible to travel to their destination country. vaccinationRequirements should be the fourth property. List any mandatory vaccines that the traveler must have to travel to the destination country. process should be the fifth property. Provide a summary of the procedure involved for the traveler to obtain a tourist visa. miscellaneous should be the sixth property. Provide any other relevant information not covered in the other sections. contactInfo should be the seventh property. Provide any relevant emails and/or phone numbers if the traveler needs to speak with someone about the visa process. sources should be the eighth property. Provide a list of links to official websites where the traveler can find more relevant information and verify the validity of information.`;
const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
  response_mime_type: "application/json",
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export function useGenerativeModel(aiApiKey?: string, aiModel?: string) {
  const apiKey = aiApiKey || process.env.AI_API_KEY || "";
  const model = aiModel || process.env.AI_MODEL || "";

  if (!generativeModel) {
    const genAI = new GoogleGenerativeAI(apiKey);
    generativeModel = genAI.getGenerativeModel({
      model,
      systemInstruction,
      generationConfig,
      safetySettings,
    });
  }

  return generativeModel;
}

export async function generateContent(
  prompt: string | [],
  aiApiKey?: string,
  aiModel?: string
) {
  const apiKey = aiApiKey || process.env.AI_API_KEY;
  const model = aiModel || process.env.AI_MODEL;

  try {
    const result = await useGenerativeModel(apiKey, model).generateContent(
      prompt
    );
    return result.response.text();
  } catch (err: any) {
    console.error("Error generating content!");
    console.error(err);
  }
}
