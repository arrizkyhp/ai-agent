import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import ChatSuggestions from '@/features/chat/ChatWorkoutView/components/ChatSuggestions';
import type { Message } from 'ai';
import { ArrowUp } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface ChatTextAreaProps {
  messages: Message[];
  handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  status: string;
  handleSubmit: () => void;
}

const ChatTextArea = (props: ChatTextAreaProps) => {
  const { messages, handleInputChange, input, handleSubmit, status } = props;

  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-t">
      {status === 'ready' && (
        <ChatSuggestions
          messages={messages}
          onSelectSuggestion={(suggestion) => {
            const syntheticEvent = {
              target: { value: suggestion },
            } as ChangeEvent<HTMLTextAreaElement>;
            handleInputChange(syntheticEvent);
          }}
        />
      )}

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
  );
};

export default ChatTextArea;
