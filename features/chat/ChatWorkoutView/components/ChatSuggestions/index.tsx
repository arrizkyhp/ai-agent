import { Button } from '@/components/ui/button';
import type { Message } from 'ai';
import { motion } from 'motion/react';
import { useMemo } from 'react';

interface ChatSuggestionsProps {
  messages: Message[];
  onSelectSuggestion: (suggestion: string) => void;
}

const ChatSuggestions = ({ messages, onSelectSuggestion }: ChatSuggestionsProps) => {
  // Use memoization to avoid recalculating on every render
  const suggestions = useMemo(() => {
    return getSuggestionsByConversationState(messages);
  }, [messages]);

  // Don't render anything if no suggestions are available
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <motion.div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
      {suggestions.map((suggestion: string) => (
        <Button
          key={suggestion}
          variant="outline"
          size="sm"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </motion.div>
  );
};

// Determine suggestions based on conversation state
function getSuggestionsByConversationState(messages: Message[]): string[] {
  console.log('Messages:', messages); // Debugging line to check messages
  // Check for different tool invocations in the conversation
  const hasFitnessProfile = checkForToolInvocation(messages, 'showFitnessProfile');
  const hasWorkoutOverview = checkForToolInvocation(messages, 'workoutProgramOverview');
  const hasFullWorkout = checkForToolInvocation(messages, 'workoutProgramFull');

  // No fitness profile yet
  if (!hasFitnessProfile) {
    return [];
  }

  // Has fitness profile but no workout overview yet
  if (hasFitnessProfile && !hasWorkoutOverview) {
    return [
      'Create a workout program',
      'What exercises do you recommend?',
      'I need to update my fitness goals',
      'Tell me more about my fitness profile',
      "What's next?",
    ];
  }

  // Has workout overview but no full workout yet
  if (hasWorkoutOverview && !hasFullWorkout) {
    return [
      'Generate the full program',
      'I need to adjust my preferences',
      'Tell me more about this program',
      'Can you modify the program focus?',
      'Proceed with this plan',
    ];
  }

  // Has full workout
  if (hasFullWorkout) {
    return [
      'Explain this exercise',
      'How do I track progress?',
      'Can I modify any exercises?',
      'What about nutrition?',
      'Thanks, this looks good!',
    ];
  }

  // Default fallback
  return [
    'Tell me more about my fitness profile',
    'How can I improve my fitness?',
    'Suggest a workout plan',
    'Update my fitness profile',
    'Continue',
  ];
}

// Helper function to check if a specific tool has been invoked
function checkForToolInvocation(messages: Message[], toolName: string): boolean {
  console.log('Checking for tool invocation:', messages); // Debugging line to check tool name
  return messages.some((msg) =>
    msg?.parts?.some(
      (part) =>
        part.type === 'tool-invocation' &&
        part.toolInvocation?.toolName === toolName &&
        part.toolInvocation?.state === 'result',
    ),
  );
}

export default ChatSuggestions;
