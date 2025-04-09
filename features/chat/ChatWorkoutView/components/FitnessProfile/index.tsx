import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import ToolsLoader from '@/features/chat/components/ToolsLoader';
import type { FitnessProfileProps } from '@/types/fitnessProfile';
import { BookOpenCheck, Building, HeartPulse, Target, UserCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface FitnessProfileComponentProps {
  args: FitnessProfileProps;
  state: 'partial-call' | 'call' | 'result';
}

const FitnessProfile = (props: FitnessProfileComponentProps) => {
  const { args, state } = props;
  const isLoading = state === 'partial-call' || state === 'call';

  console.log(args);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ToolsLoader isLoading={isLoading} />
        ) : (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="leading-relaxed mb-4"
          >
            {args.introduction}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 0.1 : 0.3 }}
      >
        <Card className="w-full mx-auto mb-4">
          <div className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-4">
                <BookOpenCheck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-xl">Fitness Profile</h3>
              </div>
              {isLoading ? (
                <Skeleton className="h-6 w-20" />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="outline" className="capitalize rounded-full bg-primary/10">
                    {args.fitnessLevel}
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Personal Information Section */}
            <div className="rounded-lg border border-gray-300 p-4 mb-4">
              <h4 className="flex items-center font-medium  mb-3">
                <UserCircle className="h-4 w-4 mr-2 text-primary" />
                Personal Information
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="flex flex-col items-start">
                  <p className="text-xs text-muted-foreground">Name</p>
                  {isLoading ? (
                    <Skeleton className="h-6 w-20" />
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-medium text-foreground"
                    >
                      {args.name}
                    </motion.p>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs text-muted-foreground">Age</p>
                  {isLoading ? (
                    <Skeleton className="h-6 w-10" />
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-medium text-foreground"
                    >
                      {args.age}
                    </motion.p>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs text-muted-foreground">Gender</p>
                  {isLoading ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-medium text-foreground"
                    >
                      {args.gender}
                    </motion.p>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-xs text-muted-foreground">Weight</p>
                  {isLoading ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-medium text-foreground"
                    >
                      {args.weight}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            {/* Fitness Goals & Preferences */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg border border-gray-300 p-3 flex flex-col">
                <div className="flex items-center mb-2">
                  <Target className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-foreground">Fitness Goal</span>
                </div>
                <div className="mt-auto">
                  {isLoading ? (
                    <Skeleton className="h-6 w-24" />
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-primary/20 rounded-full text-primary border-primary/30"
                    >
                      {args.fitnessGoal}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="rounded-lg border border-gray-300 p-3 flex flex-col">
                <div className="flex items-center mb-2">
                  <Building className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-foreground">Workout Preference</span>
                </div>
                <div className="mt-auto">
                  {isLoading ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-secondary capitalize text-foreground border-secondary/50"
                    >
                      {args.workoutAccess}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="bg-secondary/30 col-span-2 rounded-lg border border-gray-300 p-3 flex flex-col">
                <div className="flex items-center mb-2">
                  <HeartPulse className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-foreground">Physical Capacity</span>
                </div>
                <div className="mt-auto">
                  {isLoading ? (
                    <Skeleton className="h-6 w-16" />
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-secondary capitalize text-foreground border-secondary/50"
                    >
                      {args.healthAndPhysicalCapacity}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {!isLoading && args.message && (
          <motion.p
            key="greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="leading-relaxed mt-4"
          >
            {args.message}
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};

export default FitnessProfile;
