"use client";

import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Target, HeartPulse, ArrowUp, UserCircle, Building } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {ToolInvocation} from "ai";
import FitnessOnboardingForm from "../components/FitnessOnboardingForm/FitnessOnboardingForm";
import ThinkingMessage from './components/ThinkingMessage';
import InitialLoaderMessage from './components/InitialLoaderMessage';
import useChatWorkoutView from './ChatWorkoutView.hooks';
import { Badge } from '@/components/ui/badge';


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
                  <Card className="w-full mx-auto mb-4">
                      <div className="p-4 space-y-2">
                          <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2 mb-4">
                                  <BookOpenCheck className="h-5 w-5 text-primary" />
                                  <h3 className="font-semibold text-xl">Fitness Profile</h3>
                              </div>
                              <Badge variant="outline" className="capitalize rounded-full bg-primary/10">
                                  {args.fitnessLevel}
                              </Badge>

                          </div>

                          {/* Personal Information Section */}
                          <div className="bg-secondary/20 rounded-lg p-4 mb-4">
                              <h4 className="flex items-center font-medium  mb-3">
                                  <UserCircle className="h-4 w-4 mr-2 text-primary"/>
                                  Personal Information
                              </h4>
                              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                  <div className="flex flex-col items-start">
                                      <p className="text-xs text-muted-foreground">Name</p>
                                      <p className="font-medium text-foreground">{args.name}</p>
                                  </div>
                                  <div className="flex flex-col items-start">
                                      <p className="text-xs text-muted-foreground">Age</p>
                                      <p className="font-medium text-foreground">{args.age}</p>
                                  </div>
                                  <div className="flex flex-col items-start">
                                      <p className="text-xs text-muted-foreground">Gender</p>
                                      <p className="font-medium text-foreground capitalize">{args.gender}</p>
                                  </div>
                                  <div className="flex flex-col items-start">
                                      <p className="text-xs text-muted-foreground">Weight</p>
                                      <p className="font-medium text-foreground">{args.weight}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Fitness Goals & Preferences */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                              <div className="bg-secondary/30 rounded-lg p-3 flex flex-col">
                                  <div className="flex items-center mb-2">
                                      <Target className="h-4 w-4 mr-2 text-primary" />
                                      <span className="text-sm font-medium text-foreground">Fitness Goal</span>
                                  </div>
                                  <div className="mt-auto">
                                      <Badge variant="outline" className="bg-primary/20 rounded-full text-primary border-primary/30">{args.fitnessGoal}</Badge>
                                  </div>
                              </div>
                              <div className="bg-secondary/30 rounded-lg p-3 flex flex-col">
                                  <div className="flex items-center mb-2">
                                      <Building className="h-4 w-4 mr-2 text-primary" />
                                      <span className="text-sm font-medium text-foreground">Workout Preference</span>
                                  </div>
                                  <div className="mt-auto">
                                      <Badge variant="secondary" className="bg-secondary capitalize text-foreground border-secondary/50">
                                          {args.workoutAccess}
                                      </Badge>
                                  </div>
                              </div>
                              <div className="bg-secondary/30 col-span-2 rounded-lg p-3 flex flex-col">
                                  <div className="flex items-center mb-2">
                                      <HeartPulse className="h-4 w-4 mr-2 text-primary" />
                                      <span className="text-sm font-medium text-foreground">Physical Capacity</span>
                                  </div>
                                  <div className="mt-auto">
                                      <Badge variant="secondary" className="bg-secondary capitalize text-foreground border-secondary/50">
                                          {args.healthAndPhysicalCapacity}
                                      </Badge>
                                  </div>
                              </div>
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

                          <div
                            className={`p-4 rounded-lg min-w-40 h-fit ${
                              message.role === "user" ? "bg-gradient-to-br from-slate-50 to-slate-100 " : "bg-background w-full"
                            } `}
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
                          </div>
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
