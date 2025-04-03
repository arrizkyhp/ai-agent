"use client";

import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Dumbbell, Home, Target, HeartPulse, ArrowUp, UserCircle } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {ToolInvocation} from "ai";
import FitnessOnboardingForm from "../components/FitnessOnboardingForm/FitnessOnboardingForm";
import ThinkingMessage from './components/ThinkingMessage';
import InitialLoaderMessage from './components/InitialLoaderMessage';
import useChatWorkoutView from './ChatWorkoutView.hooks';


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

        if (toolName === 'showFitnessProfile' && state === 'result') {
            return (
              <>
                  <Card className="w-full  mx-auto my-4">
                      <div className="p-4 space-y-2">
                          <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                  <BookOpenCheck className="h-5 w-5 text-primary" />
                                  <h3 className="font-semibold text-xl">Fitness Profile</h3>
                              </div>
                              <p className="inline-flex items-center px-2.5 capitalize font-semibold text-xs rounded-full
                              border border-primary/30 bg-primary/10">
                                  {args.fitnessLevel}
                              </p>
                          </div>
                          <h4 className="flex items-center font-medium">
                              <UserCircle className="h-4 w-4 mr-2 text-primary"/>
                              Personal Information
                          </h4>
                          <div className="flex items-center gap-2">
                              <Dumbbell className="h-4 w-4 text-muted-foreground" />
                              <span>Name: {args.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <Dumbbell className="h-4 w-4 text-muted-foreground" />
                              <span>Name: {args.age}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <Dumbbell className="h-4 w-4 text-muted-foreground" />
                              <span>Name: {args.gender}</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <Dumbbell className="h-4 w-4 text-muted-foreground" />
                              <span>Name: {args.weight}</span>
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

                      </div>
                  </Card>
                  {args.message && (
                    <div className="mt-2 ">
                        {`"${args.message}"`}
                    </div>
                  )}
              </>

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

            <div className="flex-1 overflow-auto p-4 space-y-4" ref={messagesContainerRef}>
                {messages.map((message, index) => {

                    // Skip rendering the first user message after onboarding
                    if (index === 0 && message.role === "user" && isOnboarded) {
                        return null;
                    }

                    // Check if this is the last message and there's no loader showing
                    const isLastElement = index === messages.length - 1 &&
                      !isWaitingForInitialResponse &&
                      !(status === "submitted" && messages.length > 0 && messages[messages.length - 1].role === "user");

                    return   (
                      <div
                        className={`flex gap-2 ${message.role === "user" && "flex-row-reverse"} ${
                          isLastElement ? "min-h-[calc(100vh-200px)]" : ""
                        }`}
                        key={message.id}
                        ref={message.role === "user" && index === messages.length - 1 ? newMessageRef : null}
                      >
                          { message.role === "user" && (
                            <Avatar>
                                <AvatarFallback>
                                    {message.role === "user" ? "U" : "AI"}
                                </AvatarFallback>
                            </Avatar>
                          )}

                          <Card
                            className={`p-4 rounded-lg min-w-40 h-fit ${
                              message.role === "user" ? "bg-gradient-to-br from-slate-50 to-slate-100 " : "bg-background w-full"
                            } border`}
                          >
                              <div className="flex gap-3">

                                  <div className="flex-1">

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
                {isWaitingForInitialResponse &&
                  <div className="min-h-[calc(100vh-200px)]">
                      <InitialLoaderMessage />
                  </div>
                }

                {/* General "thinking" message loader */}
                {!isWaitingForInitialResponse &&
                  status === "submitted" &&
                  messages.length > 0 &&
                  messages[messages.length - 1].role === "user" &&
                  <div className="min-h-[calc(100vh-200px)]">
                      <ThinkingMessage />
                  </div>
                }
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

                    {/* !TODO: Make text area grow to top like T3 or Claude */}
                    <Button
                      id="chat-submit-button"
                      type="submit"
                      size="icon"
                      className="rounded-lg"
                      disabled={isWaitingForInitialResponse}
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatWorkoutView;
