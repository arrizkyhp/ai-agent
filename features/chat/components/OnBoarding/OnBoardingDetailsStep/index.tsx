import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FitnessFormValues } from '@/features/chat/types/fitnessOnBoardingType';
import type { Control } from 'react-hook-form';

interface OnBoardingDetailsStepProps {
  control: Control<FitnessFormValues>;
  userName: string;
}

const OnBoardingDetailsStep = ({ control, userName }: OnBoardingDetailsStepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">
          Hello, {userName}! <br /> Let&#39;s create your fitness profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FormField
            control={control}
            name="fitnessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your fitness goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Building Muscle">Building Muscle</SelectItem>
                    <SelectItem value="Losing Fat">Losing Fat</SelectItem>
                    <SelectItem value="Improve endurance">Improve Endurance</SelectItem>
                    <SelectItem value="General Fitness">General Fitness</SelectItem>
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
                  <Input {...field} placeholder="Any injuries or limitations?" />
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Where do you prefer to workout?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="gym">Gym</SelectItem>
                    <SelectItem value="home & gym">Home and Gym</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </>
  );
};

export default OnBoardingDetailsStep;
