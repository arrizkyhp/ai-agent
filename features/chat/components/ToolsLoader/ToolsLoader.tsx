import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const loadingMessages = [
  'Gathering your fitness data...',
  'Analyzing your profile...',
  'Designing your personalized program...',
  'Analyzing fitness data...',
  'Customizing your workout plan...',
  'Calculating optimal exercises...',
  'Designing your fitness journey...',
  'Preparing personalized recommendations...',
  'Optimizing for your fitness goals...',
];

const ToolsLoader = (props: { isLoading?: boolean }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const { isLoading = false } = props;

  // // Simulate loading with random messages
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isLoading) return;

    // Store array length in a variable to avoid referencing loadingMessages
    const messagesLength = loadingMessages.length;

    const messageInterval = setInterval(() => {
      setCurrentMessage(() => {
        return Math.floor(Math.random() * messagesLength);
      });
    }, 1500);

    return () => clearInterval(messageInterval);

    // Include loadingMessages in dependencies or use a ref if it shouldn't trigger reruns
  }, [isLoading, loadingMessages]);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm mb-4"
    >
      <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
      <motion.span
        key={currentMessage}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2 }}
        className="font-medium"
      >
        {loadingMessages[currentMessage]}
      </motion.span>
    </motion.div>
  );
};

export default ToolsLoader;
