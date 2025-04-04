import { Card } from '@/components/ui/card';
import { Calendar, Dumbbell, Info, Target } from 'lucide-react';
import { WorkoutProgramOverviewProps } from '@/types/workoutProgramOverview';

interface OverviewFitnessProps {
  args: WorkoutProgramOverviewProps
}

const OverviewFitness = (props: OverviewFitnessProps) => {
  const { args } = props;

  return (
    <div>
      <p className="mb-4 ">
        {args.opening}
      </p>
      <Card>
        <div className="flex flex-col p-4 ">
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-xl">Workout Program Overview</h3>
          </div>
          <div className="p-3 mb-2 mt-0">
            <p className="text-base ">
              {args.overview}
            </p>
          </div>

          {/* Program Focus Section */}
          <div className="mb-5">
            <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
              <span className="flex items-center">
                    <Target className="h-4 w-4 mr-2 text-primary" />
                    Program Focus
              </span>
            </h4>
            <div className="space-y-3 pl-2">
              {args.programFocus.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div>
                    <p className="font-medium text-base text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
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
            <div className="grid grid-cols-2 gap-4 pl-2">
              {args.programStructure.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div>
                    <p className="font-medium text-base text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other Program */}
          <div className="mb-5 flex flex-col gap-5">
            {args.otherProgram.map((item, index) => (
              <div key={index} className="flex items-start gap-2 w-full">
                <div className="flex flex-col w-full">
                  <h4 className="font-medium mb-3 pb-1 border-b border-border text-foreground">
                    <span className="flex items-center">
                        {item.title}
                    </span>
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>
                  {item.examples && item.examples.length > 0 && (
                    <div className="flex flex-col gap-4 ">
                      {item.examples.map((itemExample, indexExample) => (
                        <div key={indexExample} className="bg-gray-100 p-3 rounded-lg border border-gray-200">
                          <h5 className="text-base font-medium">{itemExample.title}</h5>
                          <p className="text-sm text-muted-foreground"> {itemExample.description}</p>
                            {itemExample.list && itemExample.list.length > 0 && (
                              <ul className="flex flex-col gap-2 list-disc list-outside mt-3">
                                {
                                  itemExample.list.map((itemListExample, indexListExample) => (
                                    <li key={indexListExample} className="flex flex-col items-start gap-1 p-3  bg-gray-300/40 rounded-lg  border border-gray-300">
                                      <p className="font-medium text-sm text-foreground">{itemListExample.title}</p>
                                      <p className="text-sm text-muted-foreground">{itemListExample.description}</p>
                                    </li>
                                  ))
                                }
                              </ul>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Notes Section */}
          <div className="mb-5">
            <h4 className="font-medium mb-2 pb-1 border-b border-border text-foreground">
              <span className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-primary" />
                Additional Notes
              </span>
            </h4>
            <div className="flex flex-col gap-3 p-3">
              {args.additionalNotes.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div>
                    <p className="font-medium text-base text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <p className="my-4 ">
        {args.messages}
      </p>

    </div>
  )
}

export default OverviewFitness;
