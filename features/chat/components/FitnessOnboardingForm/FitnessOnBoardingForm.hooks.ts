import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fitnessFormSchema,
  FitnessFormValues
} from "@/features/chat/types/fitnessOnBoardingType";
import { INITIAL_ON_BOARDING_FORM_DATA } from "@/features/chat/constants/fitnessOnBoard";
import {StepperStep} from "@/features/chat/components/types/stepperStep";

const useFitnessOnBoardingForm = (onSubmit: (data: FitnessFormValues) => void) => {
  const [step, setStep] = useState<StepperStep>("name");

  // Initialize form with React Hook Form and Zod validation
  const methods = useForm<FitnessFormValues>({
    resolver: zodResolver(fitnessFormSchema),
    defaultValues: INITIAL_ON_BOARDING_FORM_DATA,
    mode: "onChange"
  });

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
  } = methods;

  const handlePersonalInfoSubmit = async () => {
    // Validate only the personal info fields
    const result = await trigger(["name", "age", "gender", "weight"]);
    if (result) {
      setStep("details");
    }
  };

  const handleDetailsSubmit = async () => {
    // Validate all fields
    const result = await trigger();
    if (result) {
      setStep("overview");
    }
  };

  const handleFinalSubmit: SubmitHandler<FitnessFormValues> = (data) => {
    // Format the data as a clear message for the AI
    const formattedData = {
      ...data,
      message: `Hi, I'm ${data.name}, and I'm ${data.age} years old. I am a ${
        data.gender
      } and weight ${data.weight} kg. My fitness level is ${
        data.fitnessLevel
      }, and my goal is ${data.fitnessGoal}. ${
        data.healthAndPhysicalCapacity
          ? `I have the following physical limitations: ${data.healthAndPhysicalCapacity}.`
          : "I have no physical limitations."
      } I prefer working out at ${
        data.workoutAccess === "home" ? "home" : "the gym"
      }.`,
    };

    onSubmit(formattedData);
  };

  // Navigation handlers
  const goToPersonalInfo = () => setStep("name");
  const goToDetails = () => setStep("details");

  return {
    step,
    methods,
    control,
    handleSubmit,
    getValues,
    handlePersonalInfoSubmit,
    handleDetailsSubmit,
    handleFinalSubmit,
    goToPersonalInfo,
    goToDetails
  };
};

export default useFitnessOnBoardingForm;
