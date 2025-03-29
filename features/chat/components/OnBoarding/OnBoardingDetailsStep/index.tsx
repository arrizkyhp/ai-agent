import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { FitnessFormValues } from "@/features/chat/types/fitnessOnBoardingType";
import { StepperStep } from "@/features/chat/components/types/stepperStep";
import Stepper from "../../Stepper";

interface OnBoardingDetailsStepProps {
  control: Control<FitnessFormValues>;
  handleDetailsSubmit: () => Promise<void>;
  goToPersonalInfo: () => void;
  step: StepperStep;
  userName: string;
}

const OnBoardingDetailsStep = ({
  control,
  handleDetailsSubmit,
  goToPersonalInfo,
  step,
  userName,
}: OnBoardingDetailsStepProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Stepper currentStep={step} />
        <CardTitle>
          Hello, {userName}! Let&#39;s create your fitness profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDetailsSubmit();
          }}
          className="space-y-4"
        >
          <FormField
            control={control}
            name="fitnessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your fitness level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="fitnessGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your fitness goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Building Muscle">
                      Building Muscle
                    </SelectItem>
                    <SelectItem value="Losing Fat">Losing Fat</SelectItem>
                    <SelectItem value="Improve endurance">
                      Improve Endurance
                    </SelectItem>
                    <SelectItem value="General Fitness">
                      General Fitness
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="healthAndPhysicalCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Physical Limitations</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Any injuries or limitations?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="workoutAccess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workout Preference</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Where do you prefer to workout?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              className="flex-1"
              variant="outline"
              onClick={goToPersonalInfo}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="flex-1">
              Review <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OnBoardingDetailsStep;
