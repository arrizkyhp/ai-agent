import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ToolsLoader from '@/features/chat/components/ToolsLoader';
import type { WorkoutProgramOverviewProps } from '@/types/workoutProgramOverview';
import { Calendar, Dumbbell, Info, Target, Youtube } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface OverviewFitnessProps {
  args: WorkoutProgramOverviewProps;
  state: 'partial-call' | 'call' | 'result';
}

const OverviewFitness = (props: OverviewFitnessProps) => {
  const { args, state } = props;
  const isLoading = state === 'partial-call' || state === 'call';

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
            className="leading-relaxed mb-4"
          >
            {args.opening}
          </motion.div>
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
              <h3 className="font-semibold text-xl">Workout Program Overview</h3>
            </div>
            <div className="p-3 mb-2 mt-0">
              {isLoading ? (
                <div className="flex flex-col gap-1">
                  <Skeleton className="w-4/5 h-6 " />
                  <Skeleton className="w-11/12 h-6 " />
                  <Skeleton className="w-64 h-6 " />
                </div>
              ) : (
                <motion.p className="text-base ">{args.overview}</motion.p>
              )}
            </div>

            {/* Program Focus Section */}
            <div className="mb-5">
              <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                <span className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-primary" />
                  Program Focus
                </span>
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
                    {args.programFocus.map((item, index) => (
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

            {/* Program Structure Section */}
            <div className="mb-5">
              <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Program Structure
                </span>
              </h4>
              <div className="grid grid-cols-2 gap-4 pl-3">
                {isLoading ? (
                  <>
                    <Skeleton className="w-full h-[90px] rounded-lg" />
                    <Skeleton className="w-full h-[90px] rounded-lg" />
                    <Skeleton className="w-full h-[90px] rounded-lg" />
                  </>
                ) : (
                  <>
                    {args.programStructure.map((item, index) => (
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

            {/* Other Program */}
            <div className="mb-5 flex flex-col gap-5">
              <div>
                {isLoading ? (
                  <>
                    <div className="flex items-start gap-2 w-full">
                      <div className="flex flex-col w-full">
                        <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                          <span className="flex items-center">
                            <Skeleton className="w-40 h-6 rounded-lg" />
                          </span>
                        </h4>
                        <div className="text-sm text-neutral-500 mb-4">
                          <Skeleton className="w-3/5 h-6 rounded-lg" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pl-3">
                      <Skeleton className="w-full h-[90px] rounded-lg" />
                      <Skeleton className="w-full h-[90px] rounded-lg" />
                    </div>
                  </>
                ) : (
                  <>
                    {args.otherProgram.map((item, index) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex items-start gap-2 w-full"
                      >
                        <div className="flex flex-col w-full">
                          <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                            <span className="flex items-center">{item.title}</span>
                          </h4>
                          <p className="text-sm text-neutral-500 mb-4">{item.description}</p>
                          {item.examples && item.examples.length > 0 && (
                            <div className="flex flex-col gap-4 pl-3">
                              {item.examples.map((itemExample, indexExample) => (
                                <div
                                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                  key={indexExample}
                                  className="p-3 rounded-lg border border-gray-300"
                                >
                                  <h5 className="text-base font-medium">{itemExample.title}</h5>
                                  <p className="text-sm text-neutral-500">
                                    {itemExample.description}
                                  </p>
                                  {itemExample.list && itemExample.list.length > 0 && (
                                    <ul className="flex flex-col gap-2 list-disc list-outside mt-4">
                                      {itemExample.list.map((itemListExample, indexListExample) => (
                                        <li
                                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                                          key={indexListExample}
                                          className="flex justify-between items-start gap-1 p-3 rounded-lg  border border-gray-300"
                                        >
                                          <div className="flex flex-col gap-1">
                                            <p className="font-medium text-sm text-foreground">
                                              {itemListExample.title}
                                            </p>
                                            <p className="text-sm text-neutral-500">
                                              {itemListExample.description}
                                            </p>
                                          </div>

                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                                                  onClick={() =>
                                                    window.open(itemListExample.urlLink, '_blank')
                                                  }
                                                >
                                                  <Youtube className="h-4 w-4" />
                                                  <span>Watch Tutorial</span>
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p>
                                                  Don't know how to do this exercise? <br /> Watch a
                                                  tutorial!
                                                </p>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
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
              {isLoading ? (
                <div className="flex flex-col gap-3 pl-3">
                  <Skeleton className="w-full h-[70px] rounded-lg" />
                  <Skeleton className="w-full h-[70px] rounded-lg" />
                </div>
              ) : (
                <div className="flex flex-col gap-3 pl-3">
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
                </div>
              )}
            </div>
          </div>
        </Card>

        <AnimatePresence>
          {!isLoading && args.messages && (
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
      </motion.div>
    </>
  );
};

export default OverviewFitness;
