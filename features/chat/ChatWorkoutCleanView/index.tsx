"use client";

import { MemoizedMarkdown } from "@/components/memoized-markdown";
import {useChat} from "@ai-sdk/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {BookOpenCheck, Dumbbell, Home, SendHorizonal, Target, HeartPulse} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {useState} from "react";
import {ToolInvocation} from "ai";
import { FitnessFormData } from "@/features/chat/types/fitnessOnBoardingType";
import FitnessOnboardingForm from "../components/FitnessOnboardingForm/FitnessOnboardingForm";

const ChatWorkoutCleanView = () => {
    const [isOnboarded, setIsOnboarded] = useState(false);

    const { messages, input, status, setInput, handleInputChange, handleSubmit } = useChat({
        api: '/api/workout-clean',
    });

    const handleOnboardingSubmit = (formData: FitnessFormData) => {

        // Set the onboarding message and mark as onboarded
        setInput(formData.message);
        setIsOnboarded(true);

        // Immediately submit the form data to trigger the AI response
        handleSubmit();
    };

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
                                &#34;{args.message}&#34;
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
            <div className="max-w-3xl mx-auto h-[calc(100vh-100px)] flex items-center justify-center">
                <FitnessOnboardingForm onSubmit={handleOnboardingSubmit} />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            <h1 className="text-2xl font-bold p-4">Chat Workout Clean</h1>

            <div className="flex-1 overflow-auto p-4 space-y-4">
                {messages.map((message) => (
                    <Card
                        key={message.id}
                        className={`p-4 rounded-lg ${
                            message.role === "user" ? "bg-muted/50" : "bg-background"
                        } border`}
                    >
                        <div className="flex gap-3">
                            <Avatar>
                                <AvatarFallback>
                                    {message.role === "user" ? "U" : "AI"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="font-medium mb-1">
                                    {message.role === "user" ? "You" : "Assistant"}
                                </div>

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
                ))}
            </div>

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
                        />
                    </Card>
                    <Button id="chat-submit-button" type="submit" size="icon" className="rounded-lg">
                        <SendHorizonal className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChatWorkoutCleanView;
