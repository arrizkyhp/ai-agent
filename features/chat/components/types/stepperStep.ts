export type StepperStep = "name" | "details" | "overview";

export interface StepperProps {
    currentStep: StepperStep;
    steps?: {
        id: StepperStep;
        label: string;
    }[];
    direction: number;
}
