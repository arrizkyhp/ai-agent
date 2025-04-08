'use client';

import { MemoizedMarkdown } from '@/components/memoized-markdown';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import ChatSuggestions from '@/features/chat/ChatWorkoutView/components/ChatSuggestions';
import FullProgramFitness from '@/features/chat/ChatWorkoutView/components/FullProgramFitness';
import type { ToolInvocation } from 'ai';
import { ArrowUp } from 'lucide-react';
import type { ChangeEvent } from 'react';
import FitnessOnboardingForm from '../components/FitnessOnboardingForm/FitnessOnboardingForm';
import useChatWorkoutView from './ChatWorkoutView.hooks';
import FitnessProfile from './components/FitnessProfile';
import OverviewFitness from './components/OverviewFitness';
import ThinkingMessage from './components/ThinkingMessage';

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

  const renderToolInfo = (toolInvocation: ToolInvocation) => {
    const { toolName, state, args } = toolInvocation;

    if (toolName === 'showFitnessProfile') {
      return <FitnessProfile args={args} state={state} />;
    }

    if (toolName === 'workoutProgramOverview') {
      return <OverviewFitness args={args} state={state} />;
    }

    if (toolName === 'workoutProgramFull' && state === 'result') {
      return <FullProgramFitness args={args} />;
    }
    return null;
  };

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
        <h1 className="text-2xl font-bold p-2">Chat Workout</h1>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4" ref={messagesContainerRef}>
        {messages.map((message, index) => {
          // Skip rendering the first user message after onboarding
          if (index === 0 && message.role === 'user' && isOnboarded) {
            return null;
          }

          // Check if this is the last message and there's no loader showing
          const isLastElement =
            index === messages.length - 1 &&
            !isWaitingForInitialResponse &&
            !(
              status === 'submitted' &&
              messages.length > 0 &&
              messages[messages.length - 1].role === 'user'
            );

          return (
            <article
              className={`flex gap-2 ${
                message.role === 'user' && 'flex-row-reverse'
              } ${isLastElement ? 'min-h-[calc(100vh-200px)]' : ''}`}
              key={message.id}
              id={message.id}
              ref={message.role === 'user' && index === messages.length - 1 ? newMessageRef : null}
            >
              {message.role === 'user' && (
                <Avatar>
                  <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                </Avatar>
              )}

              <div
                key={message.id}
                className={`p-4 rounded-lg min-w-40 h-fit ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-slate-50 to-slate-100 '
                    : 'bg-background w-full'
                } `}
              >
                <div className="flex gap-3">
                  <div className="flex-1">
                    {message.parts.map((part) => {
                      if (part.type === 'text') {
                        return (
                          <MemoizedMarkdown
                            key={message.id}
                            id={message.id}
                            content={message.content}
                          />
                        );
                      }

                      if (part.type === 'tool-invocation') {
                        return renderToolInfo(part.toolInvocation);
                      }
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        {/* General "thinking" message loader */}
        {status === 'submitted' &&
          messages.length > 0 &&
          messages[messages.length - 1].role === 'user' && (
            <div className="min-h-[calc(100vh-200px)]">
              <ThinkingMessage />
            </div>
          )}
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-t">
        <ChatSuggestions
          messages={messages}
          onSelectSuggestion={(suggestion) => {
            const syntheticEvent = {
              target: { value: suggestion },
            } as ChangeEvent<HTMLTextAreaElement>;
            handleInputChange(syntheticEvent);
          }}
        />
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Card className="flex-1 p-1 rounded-lg border">
            <Textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault();

                  if (status !== 'ready') {
                    alert('Please wait for the model to finish its response!');
                  } else {
                    handleSubmit();
                  }
                }
              }}
              placeholder="Type your message..."
              className="min-h-[40px] max-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            />
          </Card>

          {/* !TODO: Make text area grow to top like T3 or Claude */}
          <Button id="chat-submit-button" type="submit" size="icon" className="rounded-lg">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWorkoutView;
