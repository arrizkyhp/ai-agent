// Define the type for a Table of Contents section
import type { Message } from 'ai';

interface TocSection {
  id: string;
  title: string;
  isCard: boolean;
}

// Helper function to extract a title from a message part
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getTitleFromMessagePart = (part): string | null => {
  if (part.type === 'tool-invocation' && part.toolInvocation.state === 'result') {
    if (part.toolInvocation.toolName === 'showFitnessProfile') {
      return 'Fitness Profile';
    }
    if (part.toolInvocation.toolName === 'showFullWorkoutProgram') {
      return 'Personalized Workout Program';
    }
    if (part.toolInvocation.toolName === 'showNutritionOverview') {
      return 'Nutrition Overview';
    }
    if (part.toolInvocation.toolName === 'showMealPlan') {
      return 'Meal Plan';
    }
    // Add other tool names and their corresponding titles here
  } else if (part.type === 'text') {
    const text = part.text.trim();

    if (text.length > 0) {
      if (text.toLowerCase().includes('time constraints')) return 'Time Constraints';
      if (text.toLowerCase().includes('workout program overview')) return 'Workout Program Overview';
      if (text.toLowerCase().includes('program confirmation')) return 'Program Confirmation';
      if (text.toLowerCase().includes('meal recommendations request')) return 'Meal Recommendations Request';
      if (text.toLowerCase().includes('budget constraints')) return 'Budget Constraints';

      return text.split(' ').slice(0, 5).join(' ') + '...';
    }
  }

  return null;
};

// Function to generate tocSections from messages
export const generateTocSections = (messages: Message[]): TocSection[] => { // Explicitly define the return type
  const sections: TocSection[] = []; // Explicitly define the type of the array
  const toolInvocationInstances: {
    [key: string]: {
      id: string; baseTitle: string; isCard: boolean; messageIndex: number; partIndex: number;
    }[] } = {}; // Explicitly define the type

  messages.forEach((message, messageIndex) => {
    const { parts = [] } = message;

    parts.forEach((part, partIndex) => {
      // Exclude the very first message's text part from being a section
      if (messageIndex === 0 && partIndex === 0 && part.type === 'text') {
        return; // Skip this part
      }

      const baseTitle = getTitleFromMessagePart(part);

      if (baseTitle) {
        const id = `message-${messageIndex}-part-${partIndex}`;
        const isCard = part.type === 'tool-invocation' && (part.toolInvocation.toolName === 'showFitnessProfile' || part.toolInvocation.toolName === 'showFullWorkoutProgram' || part.toolInvocation.toolName === 'showNutritionOverview' || part.toolInvocation.toolName === 'showMealPlan');

        if (part.type === 'tool-invocation') {
          const toolName = part.toolInvocation.toolName;

          if (!toolInvocationInstances[toolName]) {
            toolInvocationInstances[toolName] = [];
          }
          toolInvocationInstances[toolName].push(
            { id, baseTitle, isCard, messageIndex, partIndex }
          );
        } else {
          sections.push({ id, title: baseTitle, isCard });
        }
      }
    });
  });

  // Now, iterate through the stored tool invocation instances to assign titles
  Object.keys(toolInvocationInstances).forEach(toolName => {
    const instances = toolInvocationInstances[toolName];

    instances.forEach((instance, index) => {
      let title = instance.baseTitle;

      if (instances.length > 1) {
        if (index === instances.length - 1) {
          title = `${instance.baseTitle} (Latest)`;
        } else {
          title = `${instance.baseTitle} #${index + 1}`;
        }
      }

      const existingSectionIndex = sections.findIndex(sec => sec.id === instance.id);

      if (existingSectionIndex !== -1) {
        sections[existingSectionIndex].title = title;
      } else {
        sections.push({ id: instance.id, title, isCard: instance.isCard });
      }
    });
  });

  sections.sort((a, b) => {
    const aParts = a.id.split('-');
    const bParts = b.id.split('-');
    const aMessageIndex = parseInt(aParts[1], 10);
    const bMessageIndex = parseInt(bParts[1], 10);
    const aPartIndex = parseInt(aParts[3], 10);
    const bPartIndex = parseInt(bParts[3], 10);

    if (aMessageIndex !== bMessageIndex) {
      return aMessageIndex - bMessageIndex;
    }

    return aPartIndex - bPartIndex;
  });

  return sections;
};
