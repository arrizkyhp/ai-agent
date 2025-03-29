import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FitnessFormValues } from "@/features/chat/types/fitnessOnBoardingType";
import { SubmitHandler, UseFormGetValues, UseFormHandleSubmit } from "react-hook-form";

interface OnBoardingOverviewProps {
  getValues: UseFormGetValues<FitnessFormValues>;
  handleSubmit: UseFormHandleSubmit<FitnessFormValues>;
  handleFinalSubmit: SubmitHandler<FitnessFormValues>;
  goToPersonalInfo: () => void;
  goToDetails: () => void;
}

const OnBoardingOverview = ({
  getValues,
  goToPersonalInfo,
  goToDetails,
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
    <>
      <CardHeader>
        <CardTitle>Review Your Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 items-start bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">
                Personal Information
              </h3>
              <div className="flex flex-col gap-2 w-full items-start">
                <div className="grid justify-between w-full grid-cols-2 gap-y-5">
                  <div>
                    <h3 className="text-xs">Name</h3>
                    <p className="text-base font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-xs">Age</h3>
                    <p className="text-base">{formData.age}</p>
                  </div>
                  <div>
                    <h3 className="text-xs">Gender</h3>
                    <p className="text-base">{genderDisplay}</p>
                  </div>
                  <div>
                    <h3 className="text-xs">Weight</h3>
                    <p className="text-base">{formData.weight} kg</p>
                  </div>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    className="mt-2 h-auto p-0 text-primary text-sm underline"
                    onClick={goToPersonalInfo}
                >
                  Edit Personal Information
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-start bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">
                Fitness Profile
              </h3>
              <div className="flex flex-col gap-2 w-full items-start">
                <div className="grid justify-between w-full grid-cols-2 gap-y-5">
                  <div>
                    <h3 className="text-xs">Level</h3>
                    <p className="text-base font-medium">{fitnessLevelDisplay}</p>
                  </div>
                  <div>
                    <h3 className="text-xs">Goal</h3>
                    <p className="text-base font-medium">{formData.fitnessGoal}</p>
                  </div>
                  <div>
                    <h3 className="text-xs">Workout Preference</h3>
                    <p className="text-base font-medium"> {workoutAccessDisplay}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-xs">Physical Limitations</h3>
                    <p className="text-base font-medium"> {formData.healthAndPhysicalCapacity || "None specified"}</p>
                  </div>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    className="mt-2 h-auto p-0 text-primary text-sm underline"
                    onClick={goToDetails}
                >
                  Edit Fitness Profile
                </Button>
              </div>
            </div>
          </div>


          </div>
      </CardContent>
    </>
  );
};

export default OnBoardingOverview;
