import showFitnessProfile from '@/lib/ai/tools/show-fitness-profile';
import workoutProgramFull from '@/lib/ai/tools/workout-program-full';
import workoutProgramOverview from '@/lib/ai/tools/workout-program-overview';
import { generateUUID } from '@/lib/utils';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createDataStreamResponse, streamText } from 'ai';

export const maxDuration = 30;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error('DEEPSEEK_API_KEY environment variable is not set');
}

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});

// const lmstudio = createOpenAICompatible({
//     name: 'lmstudio',
//     baseURL: 'http://localhost:1234/v1/',
// });
//
// const ollama = createOllama({
//     baseURL: "http://localhost:11434/api",
// });

// Function to truncate or summarize the chat history if it gets too long
function manageContext(messages: ChatMessage[], maxContextTokens = 2048): ChatMessage[] {
  // In a real application, you'd use a tokenizer to count tokens more accurately
  const totalMessageLength = messages.reduce((acc, message) => acc + message.content.length, 0);

  if (totalMessageLength > maxContextTokens) {
    // Simple truncation (can be improved with summarization)
    const truncatedMessages = [];
    let currentLength = 0;
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if (currentLength + message.content.length <= maxContextTokens) {
        truncatedMessages.unshift(message); // Add to the beginning
        currentLength += message.content.length;
      } else {
        // Consider summarizing older messages instead of just truncating
        break;
      }
    }
    return truncatedMessages;
  }

  return messages;
}

// In app/api/chat/route.ts
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Manage the context to stay within the model's limits
    const contextMessages = manageContext(messages);

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: deepseek('deepseek-chat'),
          messages: contextMessages,
          system: `
                    You are a professional fitness coach and AI assistant specializing in creating personalized workout programs.
                    Your goal is to help users develop effective fitness plans tailored to their individual needs, fitness levels, and goals.

                    1. User will introduce themselves and their information
                    2. use tools showFitnessProfile based on the user information
                    3. after that, give information what overview Program focus, Program Structure, other Program like Example Workout Split or anything that related
                       - use tools workoutProgramOverview,
                       - if user want to add additional information update overview using workoutProgramOverview tool,
                    4. Then ask for confirmation if user need adjustment and add additional information that user need or proceed to make full program to proceed with the program generation.
                    5. After that, use tools workoutProgramFull to generate the full workout program based on the user information and overview that have been generated before.
                    
                        Interaction Guidelines:
                        - Be encouraging and supportive
                        - Provide clear, detailed explanations
                        - Break down complex fitness concepts
                        - Offer modifications for different fitness levels
                        - Give context and rationale for exercise selections
                        
                        After generating a workout program, you can:
                        - Discuss the program in detail
                        - Answer questions about exercises
                        - Provide nutritional advice
                        - Offer modifications or progressions
                        - Help with form and technique
                    `,
          experimental_activeTools: [
            'showFitnessProfile',
            'workoutProgramOverview',
            'workoutProgramFull',
          ],
          experimental_generateMessageId: generateUUID,
          tools: {
            showFitnessProfile,
            workoutProgramOverview,
            workoutProgramFull,
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: (error) => {
        console.log(error);
        return 'Oops, an error occurred!';
      },
    });
  } catch (error) {
    return new Response(
      `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        status: 500,
      },
    );
  }
}
