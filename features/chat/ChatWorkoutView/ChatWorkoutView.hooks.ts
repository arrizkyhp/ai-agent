import type { FitnessFormValues } from '@/features/chat/types/fitnessOnBoardingType';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';

const useChatWorkoutView = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isWaitingForInitialResponse, setIsWaitingForInitialResponse] = useState(false);
  const [shouldSubmitOnboarding, setShouldSubmitOnboarding] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const newMessageRef = useRef<HTMLDivElement>(null);

  const { messages, input, status, setInput, handleInputChange, handleSubmit } = useChat({
    api: '/api/workout-clean',
  });

  // Add this effect to scroll to the latest user message
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (newMessageRef.current) {
      // Get the current scroll position
      const container = messagesContainerRef.current;
      if (container) {
        const headerOffset = 90; // Height of the floating header

        // Calculate position with offset
        const elementPosition = newMessageRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        // Scroll with offset
        window.scrollBy({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOnboarded && shouldSubmitOnboarding) {
      handleSubmit();
      setShouldSubmitOnboarding(false); // Only submit once
    }
  }, [isOnboarded, handleSubmit, shouldSubmitOnboarding]);

  // Clear the "waiting" flag when *any* assistant message appears
  useEffect(() => {
    if (messages.some((message) => message.role === 'assistant')) {
      setIsWaitingForInitialResponse(false);
    }
  }, [messages]);

  const handleOnboardingSubmit = (formData: FitnessFormValues) => {
    const { message = '' } = formData || {};

    // Set the onboarding message and mark as onboarded
    setInput(message);
    setIsOnboarded(true);
    setIsWaitingForInitialResponse(true);
    setShouldSubmitOnboarding(true);
  };

  return {
    handleInputChange,
    handleOnboardingSubmit,
    handleSubmit,
    isWaitingForInitialResponse,
    isOnboarded,
    input,
    messagesContainerRef,
    messages,
    newMessageRef,
    status,
  };
};

export default useChatWorkoutView;
