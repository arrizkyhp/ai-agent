import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ThumbsUp } from "lucide-react";
import { FitnessFormValues } from "@/features/chat/types/fitnessOnBoardingType";
import { SubmitHandler, UseFormGetValues, UseFormHandleSubmit } from "react-hook-form";
import { StepperStep } from "@/features/chat/components/types/stepperStep";
import Stepper from "../../Stepper";

interface OnBoardingOverviewProps {
  getValues: UseFormGetValues<FitnessFormValues>;
  handleSubmit: UseFormHandleSubmit<FitnessFormValues>;
  handleFinalSubmit: SubmitHandler<FitnessFormValues>;
  goToPersonalInfo: () => void;
  goToDetails: () => void;
  step: StepperStep;
}

const OnBoardingOverview = ({
  getValues,
  handleSubmit,
  handleFinalSubmit,
  goToPersonalInfo,
  goToDetails,
  step,
}: OnBoardingOverviewProps) => {
  const formData = getValues();

  const genderDisplay = {
    male: "Male",
    female: "Female",
    other: "Other",
  }[formData.gender] || formData.gender;

  const fitnessLevelDisplay = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  }[formData.fitnessLevel] || formData.fitnessLevel;

  const workoutAccessDisplay = {
    home: "Home",
    gym: "Gym",
  }[formData.workoutAccess] || formData.workoutAccess;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <Stepper currentStep={step} />
        <CardTitle>Review Your Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">
              Personal Information
            </h3>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="text-sm text-gray-600">Name:</dt>
              <dd className="text-sm font-medium">{formData.name}</dd>

              <dt className="text-sm text-gray-600">Age:</dt>
              <dd className="text-sm font-medium">{formData.age}</dd>

              <dt className="text-sm text-gray-600">Gender:</dt>
              <dd className="text-sm font-medium">{genderDisplay}</dd>

              <dt className="text-sm text-gray-600">Weight:</dt>
              <dd className="text-sm font-medium">{formData.weight} kg</dd>
            </dl>
            <Button
              type="button"
              variant="ghost"
              className="mt-2 h-auto p-0 text-primary text-sm"
              onClick={goToPersonalInfo}
            >
              Edit Personal Information
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Fitness Profile</h3>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="text-sm text-gray-600">Fitness Level:</dt>
              <dd className="text-sm font-medium">{fitnessLevelDisplay}</dd>

              <dt className="text-sm text-gray-600">Fitness Goal:</dt>
              <dd className="text-sm font-medium">{formData.fitnessGoal}</dd>

              <dt className="text-sm text-gray-600">Physical Limitations:</dt>
              <dd className="text-sm font-medium">
                {formData.healthAndPhysicalCapacity || "None specified"}
              </dd>

              <dt className="text-sm text-gray-600">Workout Preference:</dt>
              <dd className="text-sm font-medium">{workoutAccessDisplay}</dd>
            </dl>
            <Button
              type="button"
              variant="ghost"
              className="mt-2 h-auto p-0 text-primary text-sm"
              onClick={goToDetails}
            >
              Edit Fitness Profile
            </Button>
          </div>

          <form onSubmit={handleSubmit(handleFinalSubmit)}>
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                className="flex-1"
                variant="outline"
                onClick={goToDetails}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Confirm <ThumbsUp className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnBoardingOverview;
