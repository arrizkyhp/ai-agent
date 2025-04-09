'use client';

import { useState } from 'react';
import FitnessOnboardingForm from '../components/FitnessOnboardingForm/FitnessOnboardingForm';
import useChatWorkoutView from './ChatWorkoutView.hooks';

import ChatBubbleContainer from '@/features/chat/ChatWorkoutView/components/ChatBubbleContainer';
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

  const [activeTab, setActiveTab] = useState<'chat' | 'profile'>('chat');

  if (!isOnboarded) {
    return (
      <div className="max-w-3xl mx-auto flex items-center min-h-screen">
        <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-screen">
      <div className="sticky top-0 flex justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
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

      {activeTab === 'chat' && (
        <>
          <ChatBubbleContainer
            messages={messages}
            messagesContainerRef={messagesContainerRef}
            newMessageRef={newMessageRef}
            status={status}
            isWaitingForInitialResponse={isWaitingForInitialResponse}
            isOnboarded={isOnboarded}
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
