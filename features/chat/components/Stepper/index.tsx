import { Fragment } from "react";
import { Check } from "lucide-react";
import {StepperProps} from "../types/stepperStep";
import { AnimatePresence, motion } from 'motion/react';

const Stepper = ({
  currentStep,
  steps = [
    { id: "name", label: "Personal Info" },
    { id: "details", label: "Fitness Profile" },
    { id: "overview", label: "Overview" }
  ],
   direction,
}: StepperProps) => {
  console.log({direction})
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
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${step.id}-${
                        currentStep === step.id ? "current" :
                          steps.findIndex(s => s.id === currentStep) > index ? "completed" : "pending"
                      }`}
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.3 }}
                      transition={{ duration: 0.1 }}
                    >
                      {currentStep === step.id ?
                        (index + 1) :
                        steps.findIndex(s => s.id === currentStep) > index ?
                          <Check className="w-6 h-6" /> :
                          (index + 1)
                      }
                    </motion.div>
                  </AnimatePresence>

                </div>
                <span className="text-xs mt-1">{step.label}</span>
              </div>


              {/* Connector (except after the last step) */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 relative">
                  <div className="absolute inset-0 bg-gray-300" />
                  {direction}
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    {/* Currently if direction is -1 then -1 the animation is right  */}
                    {steps.findIndex(s => s.id === currentStep) > index && (
                      <motion.div
                        key={`connector-${index}`}
                        className="absolute inset-0 bg-primary"
                        custom={direction}
                        variants={variants}
                        initial="initial"
                        animate="active"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

const variants = {
  initial: (direction: number) => ({
    scaleX: 0,
    transformOrigin: direction === 1 ? "left" : "right"
  }),
  active: {
    scaleX: 1
  },
  exit: (direction: number) => ({
    scaleX: 0,
    transformOrigin: direction === 1 ? "right" : "left"
  }),
}

export default Stepper;
