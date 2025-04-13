import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useFullProgram } from '@/contexts/FullWorkoutProgramContext';
import ToolsLoader from '@/features/chat/components/ToolsLoader';
import type { WorkoutProgramFullProps } from '@/types/workoutProgramFull';
import { Calendar, Dumbbell, Info, Timer, Youtube } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface FullProgramFitnessProps {
  args: WorkoutProgramFullProps;
  state: 'partial-call' | 'call' | 'result';
  isFullWorkout?: boolean;
}

const FullProgramFitness = (props: FullProgramFitnessProps) => {
  const { args, state, isFullWorkout = false } = props;
  const isLoading = state === 'partial-call' || state === 'call';
  const [isStreamingComplete, setIsStreamingComplete] = useState(false);
  const argsRef = useRef<WorkoutProgramFullProps>(args);
  const { setIsFullProgram } = useFullProgram();

  useEffect(() => {
    argsRef.current = args;
  }, [args]);

  // Define areProfilesEqual using useCallback to memoize it
  const areFullWorkoutEqual = useCallback(
    (fullWorkout1: WorkoutProgramFullProps, fullWorkout2: WorkoutProgramFullProps): boolean => {
      return JSON.stringify(fullWorkout1) === JSON.stringify(fullWorkout2);
    },
    [], // Empty dependency array if it doesn't depend on component state
  );

  useEffect(() => {
    if (state === 'result') {
      setIsStreamingComplete(true);
    }
  }, [state]);

  useEffect(() => {
    if (isStreamingComplete) {
      const storedProfile = localStorage.getItem('fullWorkout');
      let parsedStoredFullWorkout: WorkoutProgramFullProps | null = null;

      console.log(parsedStoredFullWorkout);

      if (storedProfile) {
        try {
          parsedStoredFullWorkout = JSON.parse(storedProfile);
        } catch (error) {
          toast.error(`Error parsing stored full workout: ${error}`);
        }
      }

      const currentArgs = argsRef.current;

      // Compare current args with stored profile
      if (!parsedStoredFullWorkout || !areFullWorkoutEqual(currentArgs, parsedStoredFullWorkout)) {
        localStorage.setItem('fullWorkout', JSON.stringify(currentArgs));
        toast.error('Full Workout Saved');
        setIsFullProgram(true);
      }
    }
    setIsStreamingComplete(false);
  }, [isStreamingComplete, areFullWorkoutEqual, setIsFullProgram]);

  return (
    <div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <ToolsLoader isLoading={isLoading} />
        ) : (
          !isFullWorkout && (
            <motion.div
              key="greeting"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="leading-relaxed mb-4"
            >
              {args.opening}
            </motion.div>
          )
        )}
      </AnimatePresence>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: isLoading ? 0.1 : 0.3 }}
      >
        <Card>
          <div className="flex flex-col p-4 ">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-xl">Personalized Workout Program</h3>
            </div>

            {/* Program Overview */}
            <div className="mb-5">
              <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                <span className="flex items-center">Program Focus</span>
              </h4>
              <div className="space-y-3 pl-3">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-[70px] rounded-lg" />
                    <Skeleton className="w-full h-[70px] rounded-lg" />
                  </>
                ) : (
                  <motion.div
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-3"
                  >
                    {args.programOverview.map((item, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-lg  border border-gray-300"
                      >
                        <div>
                          <p className="font-medium text-base text-foreground">{item.title}</p>
                          <p className="text-sm text-neutral-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Weekly Structure */}
            <div className="mb-5">
              <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                <span className="flex items-center">Weekly Structure</span>
              </h4>
              <div className="space-y-3 pl-3">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-[70px] rounded-lg" />
                    <Skeleton className="w-full h-[70px] rounded-lg" />
                  </>
                ) : (
                  <>
                    {args.weeklyStructure.map((item, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-lg  border border-gray-300"
                      >
                        <div>
                          <p className="font-medium text-base text-foreground">{item.title}</p>
                          <p className="text-sm text-neutral-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Workout Split */}
            <div className="mb-5">
              <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                <span className="flex items-center">Workout Split</span>
              </h4>
              <div className="flex flex-col gap-3 ">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-96 rounded-lg" />
                    <Skeleton className="w-full h-96 rounded-lg" />
                  </>
                ) : (
                  <>
                    {args.workoutProgram.map((item, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex flex-col items-start rounded-lg bg-neutral-200 border border-gray-300"
                      >
                        <div className="flex justify-between rounded-t-lg p-3 w-full">
                          <h5 className="flex items-center font-medium text-base text-foreground">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            {item.day}: {item.description}
                          </h5>
                          <p className="pl-6 text-sm text-gray-500">{item.place}</p>
                        </div>

                        <div className="w-full p-2 rounded-b-lg">
                          {item.exercises && (
                            <div className="flex flex-col bg-white rounded-lg">
                              {item.exercises.map((exercise, index) => (
                                <div
                                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                  key={index}
                                  className="flex items-start border-0 border-b border-gray-200"
                                >
                                  <div className="flex flex-col w-full gap-5 p-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                          {/* Workout Title */}

                                          <div className="flex gap-1 items-center">
                                            <TooltipProvider>
                                              <Tooltip>
                                                <TooltipTrigger asChild>
                                                  <Button
                                                    variant="ghost"
                                                    size="lg"
                                                    className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                                    onClick={() =>
                                                      window.open(exercise.urlLink, '_blank')
                                                    }
                                                  >
                                                    <Youtube className="h-6 w-6 mr-2" />
                                                    <h6 className="font-medium text-base text-foreground">
                                                      {exercise.exercise}
                                                    </h6>
                                                    {/*<span>Watch Tutorial</span>*/}
                                                  </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                  <p>
                                                    Don't know how to do this exercise? <br /> Watch
                                                    a tutorial!
                                                  </p>
                                                </TooltipContent>
                                              </Tooltip>
                                            </TooltipProvider>
                                          </div>

                                          {/* Workout Type */}
                                          <div className="flex gap-2">
                                            <Badge
                                              variant="outline"
                                              className="text-xs rounded-full text-neutral-700 w-fit"
                                            >
                                              {exercise.type}
                                            </Badge>
                                            <div className="flex gap-2">
                                              <div className="flex items-center gap-1 text-sm">
                                                <p className="text-neutral-500">Sets:</p>
                                                <p> {exercise.sets}</p>
                                              </div>
                                              <div className="flex items-center gap-1 text-sm">
                                                <p className="text-neutral-500">Reps:</p>
                                                <p> {exercise.reps}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Rest */}
                                        <div className="flex flex-col">
                                          <div className="flex gap-1 text-sm">
                                            <Timer className="h-4 w-4 text-neutral-500" />
                                            <div className="flex gap-1">
                                              <p className="text-neutral-500">Rest:</p>
                                              <p> {exercise.rest}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex gap-1 mt-1 flex-col items-end">
                                        <div className="flex items-center gap-1 text-sm">
                                          <p className="text-neutral-500">Equipment:</p>
                                          <p> {exercise.equipment}</p>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Notes */}
                                    <div className="flex w-full justify-between">
                                      <div className="flex flex-col text-sm">
                                        <p className="text-neutral-500"> Notes:</p>
                                        <p> {exercise.notes}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Additional Notes Section */}
            <div className="mb-5">
              <h4 className="font-medium mb-4 pb-1 border-b border-border text-foreground">
                <span className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-primary" />
                  Additional Notes
                </span>
              </h4>
              <div className="flex flex-col gap-3 pl-3">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-[70px] rounded-lg" />
                    <Skeleton className="w-full h-[70px] rounded-lg" />
                  </>
                ) : (
                  <>
                    {args.additionalNotes.map((item, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-start gap-2 p-3 rounded-lg  border border-gray-300"
                      >
                        <div>
                          <p className="font-medium text-base text-foreground">{item.title}</p>
                          <p className="text-sm text-neutral-500">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      <AnimatePresence>
        {!isLoading && args.messages && !isFullWorkout && (
          <motion.p
            key="greeting"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="leading-relaxed mt-4"
          >
            {args.messages}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FullProgramFitness;
