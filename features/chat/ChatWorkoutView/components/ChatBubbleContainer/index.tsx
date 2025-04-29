import type { Message, ToolInvocation } from 'ai';
import type { RefObject } from 'react';

import { MemoizedMarkdown } from '@/components/memoized-markdown';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import FitnessProfile from '@/features/chat/ChatWorkoutView/components/FitnessProfile';
import FullProgramFitness from '@/features/chat/ChatWorkoutView/components/FullProgramFitness';
import OverviewFitness from '@/features/chat/ChatWorkoutView/components/OverviewFitness';
import ThinkingMessage from '@/features/chat/ChatWorkoutView/components/ThinkingMessage';

interface ChatBubbleContainerProps {
  messages: Message[];
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  newMessageRef: RefObject<HTMLDivElement | null>;
  status: string;
  isWaitingForInitialResponse: boolean;
  isOnboarded: boolean;
  showAllMessages: boolean;
  sectionRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
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
    sectionRefs,
  } = props;

  const renderToolInfo = (toolInvocation: ToolInvocation) => {
    const { toolName, state, args } = toolInvocation;

    if (toolName === 'showFitnessProfile') {
      return <FitnessProfile args={args} state={state} />;
    }

    if (toolName === 'workoutProgramOverview') {
      return <OverviewFitness args={args} state={state} />;
    }

    if (toolName === 'workoutProgramFull') {
      return <FullProgramFitness args={args} state={state} />;
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
                {/* Assign ref to the flex-1 div, but the key in sectionRefs needs to match the dynamicTocSections ID */}
                <div className="flex-1">
                  {message?.parts?.map((part, partIndex) => { // Use partIndex here
                    // Generate the ID for this specific message part
                    const sectionId = `message-${messages.findIndex(m => m.id === message.id)}-part-${partIndex}`; // Find original index in full messages array

                    // Skip assigning ref to the very first text part if it's skipped in TOC
                    if (messages.findIndex(m => m.id === message.id) === 0 && partIndex === 0 && part.type === 'text' && messages.length > 1) {
                      // You can optionally render the content without a ref if it's not in the TOC
                      if (part.type === 'text') {
                        return <MemoizedMarkdown id={`${message.id}-${partIndex}`} key={`${message.id}-${partIndex}`} content={part.text} />;
                      }
                      if (part.type === 'tool-invocation') {
                        return <div key={`${message.id}-${partIndex}`}>{renderToolInfo(part.toolInvocation)}</div>;
                      }

                      return null;
                    }

                    if (part.type === 'text') {
                      return (
                        <div
                          key={sectionId} // Use the sectionId as the key
                          id={sectionId} // Set the ID attribute for potential other uses (though ref is used for scrolling)
                          ref={(el) => {
                            if (el && sectionRefs.current) {
                              sectionRefs.current[sectionId] = el;
                            }
                          }}
                        >
                          <MemoizedMarkdown id={sectionId} key={sectionId} content={part.text} />
                        </div>
                      );
                    }

                    if (part.type === 'tool-invocation') {
                      return (
                        <div
                          key={sectionId} // Use the sectionId as the key
                          id={sectionId} // Set the ID attribute
                          ref={(el) => {
                            if (el && sectionRefs.current) {
                              sectionRefs.current[sectionId] = el;
                            }
                          }}
                        >
                          {renderToolInfo(part.toolInvocation)}
                        </div>
                      );
                    }

                    return null;
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
    </div>
  );
};

export default ChatBubbleContainer;
