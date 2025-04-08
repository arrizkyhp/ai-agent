import { Button } from '@/components/ui/button';
import type { Message } from 'ai';
import { motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';

interface ChatSuggestionsProps {
  messages: Message[];
  onSelectSuggestion: (suggestion: string) => void;
}

const ChatSuggestions = ({ messages, onSelectSuggestion }: ChatSuggestionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const suggestions = useMemo(() => {
    return getSuggestionsByConversationState(messages);
  }, [messages]);

  if (suggestions.length === 0) {
    return null;
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1; // scroll speed factor
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        className="flex gap-2 px-2 mb-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
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
      {/* LEFT feathered blur */}
      {[0.5, 1, 2, 4, 8, 16].map((blur, idx) => (
        <div
          key={`left-blur-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            idx
          }`}
          className="left-blur-layer"
          style={{
            zIndex: idx + 1,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
          }}
        />
      ))}
      {/* RIGHT feathered blur */}
      {[0.5, 1, 2, 4, 8, 16].map((blur, idx) => (
        <div
          key={`right-blur-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            idx
          }`}
          className="right-blur-layer"
          style={{
            zIndex: idx + 1,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
          }}
        />
      ))}
    </div>
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
