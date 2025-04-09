import { MemoizedMarkdown } from '@/components/memoized-markdown';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import FitnessProfile from '@/features/chat/ChatWorkoutView/components/FitnessProfile';
import FullProgramFitness from '@/features/chat/ChatWorkoutView/components/FullProgramFitness';
import OverviewFitness from '@/features/chat/ChatWorkoutView/components/OverviewFitness';
import ThinkingMessage from '@/features/chat/ChatWorkoutView/components/ThinkingMessage';
import type { Message, ToolInvocation } from 'ai';
import type { RefObject } from 'react';

interface ChatBubbleContainerProps {
  messages: Message[];
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  newMessageRef: RefObject<HTMLDivElement | null>;
  status: string;
  isWaitingForInitialResponse: boolean;
  isOnboarded: boolean;
  showAllMessages: boolean;
}

const ChatBubbleContainer = (props: ChatBubbleContainerProps) => {
  const {
    messages,
    messagesContainerRef,
    newMessageRef,
    status,
    isWaitingForInitialResponse,
    isOnboarded,
    showAllMessages,
  } = props;

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

  const messagesToShow = showAllMessages
    ? messages
    : messages.slice(Math.max(messages.length - 2, 0));

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4" ref={messagesContainerRef}>
      {messagesToShow.map((message, index) => {
        // Skip rendering the first user message after onboarding
        if (index === 0 && message.role === 'user' && isOnboarded) {
          return null;
        }

        // Check if this is the last message and there's no loader showing
        const isLastElement =
          index === messagesToShow.length - 1 &&
          !isWaitingForInitialResponse &&
          !(
            status === 'submitted' &&
            messagesToShow.length > 0 &&
            messagesToShow[messagesToShow.length - 1].role === 'user'
          );

        return (
          <article
            className={`flex gap-2 ${
              message.role === 'user' && 'flex-row-reverse'
            } ${isLastElement ? 'min-h-[calc(100vh-200px)]' : ''}`}
            key={message.id}
            id={message.id}
            ref={
              message.role === 'user' && index === messagesToShow.length - 1 ? newMessageRef : null
            }
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
                  {message?.parts?.map((part) => {
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
        messagesToShow.length > 0 &&
        messagesToShow[messagesToShow.length - 1].role === 'user' && (
          <div className="min-h-[calc(100vh-200px)]">
            <ThinkingMessage />
          </div>
        )}

      {/* REMOVE THIS BUTTON COMPLETELY - The button is now handled in the parent component*/}
      {/* {messages.length > 2 && (
        <button onClick={() => setShowAllMessages(!showAllMessages)}>
          {showAllMessages ? 'View Last 2 Messages' : 'View Past Messages'}
        </button>
      )} */}
    </div>
  );
};

export default ChatBubbleContainer;
