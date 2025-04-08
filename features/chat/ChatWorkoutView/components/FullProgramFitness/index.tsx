import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { WorkoutProgramFullProps } from '@/types/workoutProgramFull';
import { Calendar, Dumbbell, Info, Timer } from 'lucide-react';

interface FullProgramFitnessProps {
  args: WorkoutProgramFullProps;
}

const FullProgramFitness = (props: FullProgramFitnessProps) => {
  const { args } = props;

  return (
    <div>
      <p className="mb-4">{args.opening}</p>
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
            </div>
          </div>

          {/* Weekly Structure */}
          <div className="mb-5">
            <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
              <span className="flex items-center">Weekly Structure</span>
            </h4>
            <div className="space-y-3 pl-3">
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
            </div>
          </div>

          {/* Workout Split */}
          <div className="mb-5">
            <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
              <span className="flex items-center">Workout Split</span>
            </h4>
            <div className="flex flex-col gap-3 ">
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

                  {/* !TODO: ADD PLACE HERE */}

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
                                    <h6 className="font-medium text-base text-foreground">
                                      {exercise.exercise}
                                    </h6>

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
                              <div className="flex flex-col text-sm">
                                <p className="text-neutral-500"> Notes:</p>
                                <p> {exercise.notes}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
          </div>
        </div>
      </Card>

      <p className="my-4 ">{args.messages}</p>
    </div>
  );
};

export default FullProgramFitness;
