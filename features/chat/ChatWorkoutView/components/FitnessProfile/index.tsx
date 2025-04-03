import { Card } from '@/components/ui/card';
import { BookOpenCheck, Building, HeartPulse, Target, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FitnessProfileProps } from '@/types/fitnessProfile';

interface FitnessProfileComponentProps {
  args: FitnessProfileProps;
}

const FitnessProfile = (props: FitnessProfileComponentProps) => {
  const { args } = props;

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
  )
}

export default FitnessProfile;
