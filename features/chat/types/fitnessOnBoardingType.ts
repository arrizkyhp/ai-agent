import {z} from "zod";

const personalInfoSchema = z.object({
    name: z.string().min(1, "Name is required"),
    age: z.string().min(1, "Age is required"),
    gender: z.string().min(1, { message: "Gender is required" }),
    weight: z.string().min(1, "Weight is required"),
});

const fitnessDetailsSchema = z.object({
    fitnessLevel: z.string().min(1, "Fitness Level is required"),
    fitnessGoal: z.string().min(1, "Fitness Goal is required"),
    healthAndPhysicalCapacity: z.string().optional(),
    workoutAccess: z.string().min(1, { message: "Workout Preference is required" }),
    message: z.string().optional(),
});

// Combine schemas for the complete form
export const fitnessFormSchema = personalInfoSchema.merge(fitnessDetailsSchema);

// Infer the type from the schema
export type FitnessFormValues = z.infer<typeof fitnessFormSchema>;

export interface FitnessOnboardingFormProps {
    onSubmit: (data: FitnessFormValues) => void;
}
