'use client';

import { useEffect, useState } from 'react';
import FitnessOnboardingForm from '../components/FitnessOnboardingForm/FitnessOnboardingForm';
import useChatWorkoutView from './ChatWorkoutView.hooks';

import ChatBubbleContainer from '@/features/chat/ChatWorkoutView/components/ChatBubbleContainer';
import { ChevronLast, ChevronUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import ChatTextArea from './components/ChatTextArea';

// !TODO: Important, chat always forget fitness profile, Add local storage
// !TODO: add better-auth & supabase

// !TODO: find out if generating tools has loader, if has add loader based on tool type

const ChatWorkoutView = () => {
  const {
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
  } = useChatWorkoutView();

  console.log(status);

  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');
  const [showAllMessages, setShowAllMessages] = useState(false);

  useEffect(() => {
    // Check if the last message contains a tool invocation
    if (
      messages.length > 0 &&
      messages[messages.length - 1].parts.some((part) => part.type === 'tool-invocation')
    ) {
      setShowAllMessages(false); // Always show last 2 when a tool is called
    }
  }, [messages]);

  // Function to scroll to top
  const scrollToTop = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth', // Optional: Adds a smooth scrolling animation
      });
    }
  };

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
          <h1 className="text-xl font-bold p-2">Chat Workout</h1>
          <div className="flex space-x-2 mt-2">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded ${
                activeTab === 'chat' ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              Chat
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded ${
                activeTab === 'profile' ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              Fitness Profile
            </button>
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
          <p>No fitness profile data available.</p>
        </div>
      )}
    </div>
  );
};

export default ChatWorkoutView;
