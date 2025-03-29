import { Fragment } from "react";
import { Check } from "lucide-react";
import {StepperProps} from "../types/stepperStep";

const Stepper = ({
  currentStep,
  steps = [
    { id: "name", label: "Personal Info" },
    { id: "details", label: "Fitness Profile" },
    { id: "overview", label: "Overview" }
  ]
}: StepperProps) => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex items-center w-full max-w-md">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            {/* Step Circle */}
            <div className="relative flex flex-col items-center">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  currentStep === step.id || 
                  steps.findIndex(s => s.id === currentStep) > index
                    ? "bg-primary border-primary text-white"
                    : "bg-gray-200 border-gray-300 text-gray-600"
                }`}
              >
                {currentStep === step.id ?
                  (index + 1) :
                  steps.findIndex(s => s.id === currentStep) > index ?
                    <Check className="w-6 h-6" /> :
                    (index + 1)
                }
              </div>
              <span className="text-xs mt-1">{step.label}</span>
            </div>

            {/* Connector (except after the last step) */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  steps.findIndex(s => s.id === currentStep) > index 
                    ? "bg-primary" 
                    : "bg-gray-300"
                }`}
              ></div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
