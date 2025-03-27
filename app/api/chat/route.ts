// app/api/chat/route.ts
import { streamText } from "ai";
import { createOllama } from "ollama-ai-provider";

export const maxDuration = 30;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

if (!process.env.DEEPSEEK_API_KEY) {
  throw new Error("DEEPSEEK_API_KEY environment variable is not set");
}

// const deepseek = createDeepSeek({
//   apiKey: process.env.DEEPSEEK_API_KEY ?? "",
// });

const ollama = createOllama({
  baseURL: "http://localhost:11434/api",
});

// Function to truncate or summarize the chat history if it gets too long
function manageContext(
  messages: ChatMessage[],
  maxContextTokens: number = 2048
): ChatMessage[] {
  // In a real application, you'd use a tokenizer to count tokens more accurately
  const totalMessageLength = messages.reduce(
    (acc, message) => acc + message.content.length,
    0
  );

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

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Manage the context to stay within the model's limits
  const contextMessages = manageContext(messages);

  const result = streamText({
    model: ollama("gemma3"),
    messages: contextMessages,
    system: `You are a helpful assistant that make workout programme.`,
  });

  return result.toDataStreamResponse();
}
