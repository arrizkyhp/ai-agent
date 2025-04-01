"use client";

import { MemoizedMarkdown } from "@/components/memoized-markdown";
import {useChat} from "@ai-sdk/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Dumbbell, Home, SendHorizonal, Target, HeartPulse } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from 'react';
import {ToolInvocation} from "ai";
import { FitnessFormValues } from "@/features/chat/types/fitnessOnBoardingType";
import FitnessOnboardingForm from "../components/FitnessOnboardingForm/FitnessOnboardingForm";

// General "thinking" message
const ThinkingMessage = () => (
  <Card className="p-4 rounded-lg bg-background border">
      <div className="flex gap-3">
          <Avatar>
              <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex flex-col gap-2 ">
              <h3 className="font-semibold text-lg text-slate-800">AI Assistant</h3>
              <div className="flex justify-start space-x-2 pt-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse"
                      style={{
                          animationDelay: `${i * 300}ms`,
                          animationDuration: "1.5s",
                      }}
                    />
                  ))}
              </div>
          </div>
      </div>
  </Card>
);

// !TODO: Change this to skeleton loader tools Fitness Profile
// Special loader for the initial AI response
const InitialAILoader = () => (
  <Card className="p-4 rounded-lg bg-background border">
      <div className="flex gap-3">
          <Avatar>
              <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-slate-800">AI Assistant</h3>
                </div>
              <div className="flex flex-col gap-2 mt-2">
                  <div className="text-sm text-muted-foreground italic">
                      Analyzing your fitness profile, please wait...
                  </div>
                  <div className="flex justify-start space-x-2 pt-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse"
                          style={{
                              animationDelay: `${i * 300}ms`,
                              animationDuration: "1.5s",
                          }}
                        />
                      ))}
                  </div>
              </div>
          </div>
      </div>
  </Card>
);
const ChatWorkoutCleanView = () => {
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [isWaitingForInitialResponse, setIsWaitingForInitialResponse] =
      useState(false);
    const [shouldSubmitOnboarding, setShouldSubmitOnboarding] = useState(false);


    const { messages, input, status, setInput, handleInputChange, handleSubmit } = useChat({
        api: '/api/workout-clean',
    });

    console.log(status)

    const handleOnboardingSubmit = (formData: FitnessFormValues) => {
        const { message = '' } = formData || {};

        // Set the onboarding message and mark as onboarded
        setInput(message);
        setIsOnboarded(true);
        setIsWaitingForInitialResponse(true);
        setShouldSubmitOnboarding(true);

    };

    useEffect(() => {
        if (isOnboarded && shouldSubmitOnboarding) {
            handleSubmit();
            setShouldSubmitOnboarding(false); // Only submit once
        }
    }, [isOnboarded, handleSubmit, shouldSubmitOnboarding]);

    // Clear the "waiting" flag when *any* assistant message appears
    useEffect(() => {
        if (messages.some((message) => message.role === "assistant")) {
            setIsWaitingForInitialResponse(false);
        }
    }, [messages]);

    const renderToolInfo = (toolInvocation: ToolInvocation) => {
        const { toolName, state, args } = toolInvocation;

        if (toolName === 'showFitnessProfile' && state === 'result') {
            return (
                <Card className="w-full max-w-md mx-auto my-4">
                    <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                            <BookOpenCheck className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Fitness Profile</h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <Dumbbell className="h-4 w-4 text-muted-foreground" />
                            <span>Fitness Level: {args.fitnessLevel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>Fitness Goal: {args.fitnessGoal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HeartPulse className="h-4 w-4 text-muted-foreground" />
                            <span>Physical Capacity: {args.healthAndPhysicalCapacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Home className="h-4 w-4 text-muted-foreground" />
                            <span>Workout Preference: {args.workoutAccess}</span>
                        </div>
                        {args.message && (
                            <div className="mt-2 italic text-muted-foreground">
                                {`"${args.message}"`}
                            </div>
                        )}
                    </div>
                </Card>
            );
        }
        return null;
    };

    if (!isOnboarded) {
        return (
            <div className="max-w-3xl mx-auto flex items-center justify-center">
                <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto flex flex-col">
            <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
                <h1 className="text-2xl font-bold p-2">Chat Workout</h1>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((message, index) => {

                    // Skip rendering the first user message after onboarding
                    if (index === 0 && message.role === "user" && isOnboarded) {
                        return null;
                    }

                    return   (
                      <div className={`flex gap-2 ${message.role === "user" && "flex-row-reverse"} `}  key={message.id}>
                          { message.role === "user" && (
                            <Avatar>
                                <AvatarFallback>
                                    {message.role === "user" ? "U" : "AI"}
                                </AvatarFallback>
                            </Avatar>
                          )}

                          <Card
                            className={`p-4 rounded-lg min-w-40 ${
                              message.role === "user" ? "bg-gradient-to-br from-slate-50 to-slate-100 " : "bg-background w-full"
                            } border`}
                          >
                              <div className="flex  gap-3">

                                  <div className="flex-1">
                                      {/*<div className="font-medium mb-1">*/}
                                      {/*    <h3 className="font-semibold text-lg text-slate-800">*/}
                                      {/*        {message.role === "user" ? "You" : "Assistant"}*/}
                                      {/*    </h3>*/}
                                      {/*</div>*/}

                                      {message.parts.map((part) => {
                                          if (part.type === "text") {
                                              return (
                                                <MemoizedMarkdown key={message.id} id={message.id} content={message.content} />
                                              )
                                          }

                                          if (part.type === 'tool-invocation') {
                                              return renderToolInfo(part.toolInvocation);
                                          }
                                      })}
                                  </div>
                              </div>
                          </Card>
                      </div>

                    )
                  }
                )}

                {/* Initial AI response loader */}
                {isWaitingForInitialResponse && <InitialAILoader />}

                {/* General "thinking" message loader */}
                {!isWaitingForInitialResponse &&
                  status === "submitted" &&
                  messages.length > 0 &&
                  messages[messages.length - 1].role === "user" && <ThinkingMessage />}
            </div>

            {/* !TODO: ADD Suggestion chat if fitness Profile introduction appears */}

            <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Card className="flex-1 p-1 rounded-lg border">
                        <Textarea
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={(event) => {
                                if (
                                    event.key === 'Enter' &&
                                    !event.shiftKey &&
                                    !event.nativeEvent.isComposing
                                ) {
                                    event.preventDefault();

                                    if (status !== 'ready') {
                                        alert('Please wait for the model to finish its response!')
                                    } else {
                                        handleSubmit();
                                    }
                                }
                            }}
                            placeholder="Type your message..."
                            className="min-h-[40px] max-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
                            disabled={isWaitingForInitialResponse}
                        />
                    </Card>
                    <Button
                      id="chat-submit-button"
                      type="submit"
                      size="icon"
                      className="rounded-lg"
                      disabled={isWaitingForInitialResponse}
                    >
                        <SendHorizonal className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatWorkoutCleanView;
