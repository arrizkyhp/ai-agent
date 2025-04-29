'use client';

import { useMemo, useRef } from 'react';

import { ChevronLast, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import TableOfContents from '@/components/ui/tableOfContents';
import { useFullProgram } from '@/contexts/FullWorkoutProgramContext';
import { useProfileUpdate } from '@/contexts/ProfileUpdateContext';
import ChatBubbleContainer from '@/features/chat/ChatWorkoutView/components/ChatBubbleContainer';
import FitnessProfile from '@/features/chat/ChatWorkoutView/components/FitnessProfile';
import FullProgramFitness from '@/features/chat/ChatWorkoutView/components/FullProgramFitness';
import { generateTocSections } from '@/helpers/generateSectionsHistory';

import FitnessOnboardingForm from '../components/FitnessOnboardingForm/FitnessOnboardingForm';

import ChatTextArea from './components/ChatTextArea';
import useChatWorkoutView from './ChatWorkoutView.hooks';

// !TODO: Important, chat always forget fitness profile, Add local storage
// !TODO: add better-auth & supabase

// !TODO: find out if generating tools has loader, if has add loader based on tool type

// Define the sections for the table of contents
// const tocSections = [
//   { id: 'intro', title: 'Introduction', isCard: false },
//   { id: 'fitness-profile', title: 'Fitness Profile', isCard: true },
//   { id: 'time-constraints', title: 'Time Constraints', isCard: false },
//   { id: 'workout-overview', title: 'Workout Program Overview', isCard: true },
//   { id: 'program-confirmation', title: 'Program Confirmation', isCard: false },
//   { id: 'personalized-program', title: 'Personalized Workout Program', isCard: true },
//   { id: 'meal-request', title: 'Meal Recommendations Request', isCard: false },
//   { id: 'nutrition-overview', title: 'Nutrition Overview', isCard: true },
//   { id: 'budget-constraints', title: 'Budget Constraints', isCard: false },
//   { id: 'chicken-meal-plan', title: 'Chicken-Based Meal Plan', isCard: true },
// ];

const ChatWorkoutView = () => {
  const {
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
    status,
    showAllMessages,
    fullWorkoutRef,
    scrollToTop,
    scrollToFullWorkoutTop,
    setShowAllMessages,
    setActiveTab,
  } = useChatWorkoutView();

  console.log(messages);

  const { isProfileUpdated, setIsProfileUpdated } = useProfileUpdate();
  const { isFullProgram, setIsFullProgram } = useFullProgram();
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const dynamicTocSections = useMemo(() => generateTocSections(messages), [messages]);

  console.log(dynamicTocSections);

  if (!isOnboarded) {
    return (
      <div className="max-w-3xl mx-auto flex items-center min-h-screen">
        <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <div className="max-w-3xl mx-auto flex items-center min-h-screen">
        <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
      </div>
    );
  }

  const handleNavigate = (id: string) => {
    const element = sectionRefs.current[id];

    console.log(element);

    if (element) {
      // Scroll to the element with some offset for the header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  console.log(dynamicTocSections);

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-screen">

      {/* Table of Contents */}
      {messages.length > 1 && activeTab === 'chat' &&
      <TableOfContents sections={dynamicTocSections} onNavigate={handleNavigate} isLoading={status !== 'ready'} />
      }
      <div className="sticky top-0 flex flex-col bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold p-2">Chat with AI Assistant</h1>
          <div className="flex space-x-2 mt-2">
            <Button
              variant="default"
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded ${
                activeTab === 'chat'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800  hover:bg-gray-300'
              }`}
            >
              Chat
            </Button>
            <div className="relative">
              <Button
                variant="default"
                onClick={() => {
                  setActiveTab('profile');
                  setIsProfileUpdated(false);
                  scrollToTop();
                }}
                className={`px-4 py-2 rounded ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Fitness Profile
              </Button>

              {/* Status indicator circle */}
              {isProfileUpdated && (
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-white "
                  aria-label="Profile data is updated"
                />
              )}
            </div>

            <div className="relative">
              <Button
                variant="default"
                onClick={() => {
                  setActiveTab('fullWorkout');
                  setIsFullProgram(false);
                  scrollToFullWorkoutTop();
                }}
                className={`px-4 py-2 rounded ${
                  activeTab === 'fullWorkout'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                Full Workout
              </Button>

              {/* Status indicator circle */}
              {isFullProgram && (
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-white "
                  aria-label="Profile data is updated"
                />
              )}
            </div>
          </div>
        </div>

        {messages.length > 2 && activeTab === 'chat' && status === 'ready' && (
          <AnimatePresence>
            <motion.button
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              onClick={() => {
                setShowAllMessages(!showAllMessages);
                scrollToTop();
              }}
              className="absolute -bottom-10 right-0 self-start w-full text-sm mt-2 px-4 py-2 rounded bg-transparent group "
            >
              {showAllMessages ? (
                <div className="flex text-gray-300 group-hover:text-gray-800 gap-2 items-center justify-end">
                  <ChevronLast className="rotate-90 w-5 h-5" />
                  <p>View Last Messages</p>
                </div>
              ) : (
                <div className="flex text-gray-300 group-hover:text-gray-800 gap-2 items-center justify-end">
                  <ChevronUp className="w-5 h-5" />
                  <p>View Past Messages</p>
                </div>
              )}
            </motion.button>
          </AnimatePresence>
        )}
      </div>

      {activeTab === 'chat' && (
        <>
          <ChatBubbleContainer
            messages={messages}
            messagesContainerRef={messagesContainerRef}
            newMessageRef={newMessageRef}
            status={status}
            isWaitingForInitialResponse={isWaitingForInitialResponse}
            isOnboarded={isOnboarded}
            showAllMessages={showAllMessages}
            sectionRefs={sectionRefs}
          />

          <ChatTextArea
            messages={messages}
            handleInputChange={handleInputChange}
            input={input}
            handleSubmit={handleSubmit}
            status={status}
          />
        </>
      )}

      {activeTab === 'profile' && (
        <div className="p-4">
          {fitnessProfileData ? (
            <FitnessProfile args={fitnessProfileData} state="result" isProfile />
          ) : (
            <p>No fitness profile data available.</p>
          )}
        </div>
      )}

      {activeTab === 'fullWorkout' && (
        <div className="p-4" ref={fullWorkoutRef}>
          {fullProgramData ? (
            <FullProgramFitness args={fullProgramData} state="result" isFullWorkout />
          ) : (
            <p>No Full Workout data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWorkoutView;
