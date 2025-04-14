import { useEffect, useRef, useState } from 'react';

import { useChat } from '@ai-sdk/react';

import type { FitnessFormValues } from '@/features/chat/types/fitnessOnBoardingType';
import type { FitnessProfileProps } from '@/types/fitnessProfile';
import type { WorkoutProgramFullProps } from '@/types/workoutProgramFull';

const useChatWorkoutView = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isWaitingForInitialResponse, setIsWaitingForInitialResponse] = useState(false);
  const [shouldSubmitOnboarding, setShouldSubmitOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'profile' | 'fullWorkout'>('chat');
  const [showAllMessages, setShowAllMessages] = useState(false);

  const [fitnessProfileData, setFitnessProfileData] = useState<FitnessProfileProps | null>(null);
  const [fullProgramData, setFullProgramData] = useState<WorkoutProgramFullProps | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const newMessageRef = useRef<HTMLDivElement>(null);

  const fullWorkoutRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Check if the last message contains a tool invocation
    if (
      messages.length > 0 &&
      messages[messages.length - 1].parts.some((part) => part.type === 'tool-invocation')
    ) {
      setShowAllMessages(false); // Always show last 2 when a tool is called
    }
  }, [messages]);

  // useEffect to fetch the profile on component mount and when activeTab changes to 'profile'
  useEffect(() => {
    if (activeTab === 'profile') {
      fetchFitnessProfile();
    }
    if (activeTab === 'fullWorkout') {
      fetchFullProgram();
    }
  }, [activeTab]);

  // useEffect to listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'fitnessProfile') {
        fetchFitnessProfile();
      }
      if (event.key === 'fullWorkout') {
        fetchFullProgram();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  // Function to fetch the fitness profile from localStorage
  const fetchFitnessProfile = () => {
    const storedProfile = localStorage.getItem('fitnessProfile');

    if (storedProfile) {
      try {
        const parsedProfile: FitnessProfileProps = JSON.parse(storedProfile);

        setFitnessProfileData(parsedProfile);
      } catch (error) {
        console.error('Error parsing stored fitness profile:', error);
        setFitnessProfileData(null);
      }
    } else {
      setFitnessProfileData(null); // Clear the state if no profile is found
    }
  };

  const fetchFullProgram = () => {
    const storedProfile = localStorage.getItem('fullWorkout');

    if (storedProfile) {
      try {
        const parsedProfile = JSON.parse(storedProfile);

        setFullProgramData(parsedProfile);
      } catch (error) {
        console.error('Error parsing stored fitness profile:', error);
        setFullProgramData(null);
      }
    } else {
      setFullProgramData(null); // Clear the state if no profile is found
    }
  };

  const handleOnboardingSubmit = (formData: FitnessFormValues) => {
    const { message = '' } = formData || {};

    // Set the onboarding message and mark as onboarded
    setInput(message);
    setIsOnboarded(true);
    setIsWaitingForInitialResponse(true);
    setShouldSubmitOnboarding(true);
  };

  // Function to scroll to top
  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Adds a smooth scrolling animation
      });
    }
  };

  const scrollToFullWorkoutTop = () => {
    fullWorkoutRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    activeTab,
    handleInputChange,
    handleOnboardingSubmit,
    handleSubmit,
    isWaitingForInitialResponse,
    isOnboarded,
    input,
    fitnessProfileData,
    fullProgramData,
    messagesContainerRef,
    messages,
    newMessageRef,
    fullWorkoutRef,
    status,
    showAllMessages,
    scrollToTop,
    scrollToFullWorkoutTop,
    setShowAllMessages,
    setActiveTab,
  };
};

export default useChatWorkoutView;
