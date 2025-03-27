"use client";

import { MemoizedMarkdown } from "@/components/memoized-markdown";
import { useChat } from "@ai-sdk/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SendHorizonal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const ChatView = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      <h1 className="text-2xl font-bold p-4">Chat</h1>

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
                <MemoizedMarkdown id={message.id} content={message.content} />
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
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter" && e.shiftKey) {
                  return;
                }
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message..."
              className="min-h-[40px] max-h-[200px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            />
          </Card>
          <Button type="submit" size="icon" className="rounded-lg">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;
