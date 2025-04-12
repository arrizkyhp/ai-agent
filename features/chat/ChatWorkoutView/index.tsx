'use client';

import FitnessOnboardingForm from '../components/FitnessOnboardingForm/FitnessOnboardingForm';
import useChatWorkoutView from './ChatWorkoutView.hooks';

import { Button } from '@/components/ui/button';
import { useProfileUpdate } from '@/contexts/ProfileUpdateContext';
import ChatBubbleContainer from '@/features/chat/ChatWorkoutView/components/ChatBubbleContainer';
import FitnessProfile from '@/features/chat/ChatWorkoutView/components/FitnessProfile';
import { ChevronLast, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import ChatTextArea from './components/ChatTextArea';

// !TODO: Important, chat always forget fitness profile, Add local storage
// !TODO: add better-auth & supabase

// !TODO: find out if generating tools has loader, if has add loader based on tool type

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
    messagesContainerRef,
    messages,
    newMessageRef,
    status,
    showAllMessages,
    scrollToTop,
    setShowAllMessages,
    setActiveTab,
  } = useChatWorkoutView();

  const { isProfileUpdated, setIsProfileUpdated } = useProfileUpdate();

  if (!isOnboarded) {
    return (
      <div className="max-w-3xl mx-auto flex items-center min-h-screen">
        <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-screen">
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
                scrollToTop(); // Call the scroll function
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
    </div>
  );
};

export default ChatWorkoutView;
