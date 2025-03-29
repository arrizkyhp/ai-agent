import {
    FitnessOnboardingFormProps
} from "../../types/fitnessOnBoardingType";
import { FormProvider } from "react-hook-form";
import OnBoardingPersonalInfo from "../OnBoarding/OnBoardingPersonalInfo";
import OnBoardingDetailsStep from "../OnBoarding/OnBoardingDetailsStep";
import OnBoardingOverview from "../OnBoarding/OnBoardingOverview";
import useFitnessOnBoardingForm from "./FitnessOnBoardingForm.hooks";

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
            handlePersonalInfoSubmit={handlePersonalInfoSubmit}
            step={step}
        />
    );

    const renderDetailsStep = () => (
        <OnBoardingDetailsStep
            control={control}
            handleDetailsSubmit={handleDetailsSubmit}
            goToPersonalInfo={goToPersonalInfo}
            step={step}
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
            step={step}
        />
    );

    return (
        <FormProvider {...methods}>
            {step === "name" && renderPersonalInfoStep()}
            {step === "details" && renderDetailsStep()}
            {step === "overview" && renderOverviewStep()}
        </FormProvider>
    );
};

export default FitnessOnboardingForm;

