import { Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment } from 'react';
import type { StepperProps } from '../types/stepperStep';

const Stepper = ({
  currentStep,
  steps = [
    { id: 'name', label: 'Personal Info' },
    { id: 'details', label: 'Fitness Profile' },
    { id: 'overview', label: 'Overview' },
  ],
  direction,
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
                  currentStep === step.id || steps.findIndex((s) => s.id === currentStep) > index
                    ? 'bg-primary border-primary text-white'
                    : 'bg-gray-100 border-gray-200 text-gray-400'
                }`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${step.id}-${
                      currentStep === step.id
                        ? 'current'
                        : steps.findIndex((s) => s.id === currentStep) > index
                          ? 'completed'
                          : 'pending'
                    }`}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.1 }}
                  >
                    {currentStep === step.id ? (
                      index + 1
                    ) : steps.findIndex((s) => s.id === currentStep) > index ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-7 w-24 -inset-x-4 ">
                <span
                  className={`text-xs mt-1 px-2 py-2  ${
                    currentStep === step.id ? 'text-neutral-900 ' : 'text-neutral-400'
                  } rounded-sm`}
                >
                  {step.label}
                </span>
              </div>
            </div>

            {/* Connector (except after the last step) */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 relative">
                <div className="absolute inset-0 bg-gray-200" />
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                  {/* Currently if direction is -1 then -1 the animation is right  */}
                  {steps.findIndex((s) => s.id === currentStep) > index && (
                    <motion.div
                      key={`connector-${
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        index
                      }`}
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
    transformOrigin: direction === 1 ? 'left' : 'right',
  }),
  active: {
    scaleX: 1,
  },
  exit: (direction: number) => ({
    scaleX: 0,
    transformOrigin: direction === 1 ? 'right' : 'left',
  }),
};

export default Stepper;
