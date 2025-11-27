import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Tool } from "@google/genai";
import { DEFAULT_SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = (): GoogleGenAI => {
  if (!genAI) {
    if (!process.env.API_KEY) {
      console.error("API Key not found in environment variables");
      throw new Error("API Key is missing. Please set process.env.API_KEY.");
    }
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

// Define the tool for scheduling
const scheduleServiceTool: FunctionDeclaration = {
  name: 'schedule_service',
  description: 'Agendar um serviço na oficina mecânica quando o cliente confirma data, hora e tipo de serviço.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      customerName: {
        type: Type.STRING,
        description: 'Nome do cliente',
      },
      serviceType: {
        type: Type.STRING,
        description: 'Tipo de serviço (ex: Troca de óleo, Alinhamento, etc)',
      },
      dateTime: {
        type: Type.STRING,
        description: 'Data e hora do agendamento (ex: 20/10 às 14h)',
      },
    },
    required: ['customerName', 'serviceType', 'dateTime'],
  },
};

export const initializeChat = (customInstruction?: string, useTools: boolean = false): Chat => {
  const ai = getGenAI();
  
  const tools: Tool[] = useTools ? [{ functionDeclarations: [scheduleServiceTool] }] : [];

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: customInstruction || DEFAULT_SYSTEM_INSTRUCTION,
      temperature: 0.7,
      tools: tools,
    },
  });
  return chatSession;
};

export const sendMessageToSDR = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Fallback if session was lost/not init
    initializeChat();
  }

  if (!chatSession) {
      throw new Error("Failed to initialize chat session.");
  }

  try {
    let response: GenerateContentResponse = await chatSession.sendMessage({ message });

    // Handle Function Calls
    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCalls = response.functionCalls;
      const functionResponseParts = [];

      for (const call of functionCalls) {
        if (call.name === 'schedule_service') {
          const { customerName, serviceType, dateTime } = call.args as any;
          
          // MOCK: Here is where you would call the real Google Calendar API
          console.log(`[MOCK API] Scheduling for ${customerName}: ${serviceType} at ${dateTime}`);
          
          // Create a success response to send back to the model
          // Fix: Use Part format for sendMessage instead of sendToolResponse format
          functionResponseParts.push({
            functionResponse: {
              name: call.name,
              response: { 
                result: "success", 
                message: `Agendamento confirmado com sucesso no Google Agenda para ${dateTime}. ID: #G-12345` 
              },
              id: call.id
            }
          });
        }
      }

      // Send the function execution result back to the model so it can generate the final natural language response
      if (functionResponseParts.length > 0) {
        // Fix: Use sendMessage with parts as sendToolResponse is not available on Chat
        response = await chatSession.sendMessage({
          message: functionResponseParts
        });
      }
    }

    return response.text || "Desculpe, não consegui processar sua resposta no momento.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Tive um pequeno problema técnico. Poderia repetir, por favor?";
  }
};