import {
    FitnessOnboardingFormProps
} from "../../types/fitnessOnBoardingType";
import { FormProvider } from "react-hook-form";
import OnBoardingPersonalInfo from "../OnBoarding/OnBoardingPersonalInfo";
import OnBoardingDetailsStep from "../OnBoarding/OnBoardingDetailsStep";
import OnBoardingOverview from "../OnBoarding/OnBoardingOverview";
import useFitnessOnBoardingForm from "./FitnessOnBoardingForm.hooks";
import {Card} from "@/components/ui/card";
import Stepper from "@/features/chat/components/Stepper";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight, ThumbsUp} from "lucide-react";

const FitnessOnboardingForm = ({ onSubmit }: FitnessOnboardingFormProps) => {
    const {
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
    } = useFitnessOnBoardingForm(onSubmit);

    const renderPersonalInfoStep = () => (
        <OnBoardingPersonalInfo
            control={control}
        />
    );

    const renderDetailsStep = () => (
        <OnBoardingDetailsStep
            control={control}
            userName={getValues("name") }
        />
    );

    const renderOverviewStep = () => (
        <OnBoardingOverview
            getValues={getValues}
            handleSubmit={handleSubmit}
            handleFinalSubmit={handleFinalSubmit}
            goToPersonalInfo={goToPersonalInfo}
            goToDetails={goToDetails}
        />
    );

    return (
        <FormProvider {...methods}>
            <Card className="w-full max-w-md mx-auto">
                <Stepper currentStep={step} />
                <form>
                    {step === "name" && renderPersonalInfoStep()}
                    {step === "details" && renderDetailsStep()}
                    {step === "overview" && renderOverviewStep()}

                    <div className="p-6 pt-0">
                        {step === "name" && (
                            <Button onClick={handlePersonalInfoSubmit} type="submit" className="w-full">
                                Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        )}

                        {step === "details" && (
                            <div className="flex gap-2 mt-4">
                                <Button
                                    type="button"
                                    className="flex-1"
                                    variant="outline"
                                    onClick={goToPersonalInfo}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleDetailsSubmit}
                                    className="flex-1"
                                >
                                    Review <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        {step === "overview" && (
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
                                    type="button"
                                    onClick={handleSubmit(handleFinalSubmit)}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                    Confirm <ThumbsUp className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                </form>
            </Card>
        </FormProvider>
    );
};

export default FitnessOnboardingForm;

