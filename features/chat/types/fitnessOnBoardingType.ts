export interface FitnessFormData {
    name: string;
    age: string;
    gender: string;
    weight: string;
    fitnessLevel: string;
    fitnessGoal: string;
    healthAndPhysicalCapacity: string;
    workoutAccess: string;
    message: string;
}

export interface FitnessOnboardingFormProps {
    onSubmit: (data: FitnessFormData) => void;
}
