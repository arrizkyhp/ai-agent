import {FormEvent, useState } from "react";
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
  const [direction, setDirection] = useState(0);

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
    formState: { errors }
  } = methods;

  const handlePersonalInfoSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDirection(1);
    // Validate only the personal info fields
    const result = await trigger(["name", "age", "gender", "weight"]);
    if (result) {
      setStep("details");
    }
  };

  const handleDetailsSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDirection(1);
    // Validate all fields
    const result = await trigger();
    if (result) {
      setStep("overview");
    }
  };

  const handleFinalSubmit: SubmitHandler<FitnessFormValues> = (data) => {
    let workoutLocation = "";

    if (data.workoutAccess === "Home") {
      workoutLocation = "home";
    } else if (data.workoutAccess === "Gym") {
      workoutLocation = "the gym";
    } else if (data.workoutAccess === "home & gym") {
      workoutLocation = "both home and the gym";
    } else {
      workoutLocation = "an unspecified location"; // Handle unexpected values
    }

    const formattedData = {
      ...data,
      message: `Hi, I'm ${data.name}, ${data.age} years old, and ${
        data.gender
      }. I weight ${data.weight} kg. I would describe my fitness level as ${
        data.fitnessLevel
      }, and my primary fitness goal is ${
        data.fitnessGoal
      }. I prefer working out at ${workoutLocation}. ${
        data.healthAndPhysicalCapacity
          ? `I have the following health and physical considerations: ${data.healthAndPhysicalCapacity}.`
          : "I have no known health or physical limitations."
      }`,
    };

    onSubmit(formattedData);
  };

  // Navigation handlers
  const goToPersonalInfo = () => {
    setDirection(-1);
    setStep("name")
  };
  const goToDetails = () => {
    setDirection(-1);
    setStep("details")
  };

  return {
    direction,
    step,
    methods,
    control,
    errors,
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
