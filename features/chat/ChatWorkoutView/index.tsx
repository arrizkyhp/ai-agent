'use client';

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

  if (!isOnboarded) {
    return (
      <div className="max-w-3xl mx-auto flex items-center  min-h-screen">
        <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col">
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
        <h1 className="text-xl font-bold p-2">Chat Workout</h1>
      </div>

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
    </div>
  );
};

export default ChatWorkoutView;
