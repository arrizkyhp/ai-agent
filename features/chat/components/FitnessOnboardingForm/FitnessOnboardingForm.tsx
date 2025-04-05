import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Stepper from '@/features/chat/components/Stepper';
import { ArrowLeft, ArrowRight, ThumbsUp } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { FormProvider } from 'react-hook-form';
import useMeasure from 'react-use-measure';
import type { FitnessOnboardingFormProps } from '../../types/fitnessOnBoardingType';
import OnBoardingDetailsStep from '../OnBoarding/OnBoardingDetailsStep';
import OnBoardingOverview from '../OnBoarding/OnBoardingOverview';
import OnBoardingPersonalInfo from '../OnBoarding/OnBoardingPersonalInfo';
import useFitnessOnBoardingForm from './FitnessOnBoardingForm.hooks';

const FitnessOnboardingForm = ({ onSubmit }: FitnessOnboardingFormProps) => {
  const {
    direction,
    step,
    methods,
    control,
    handleSubmit,
    getValues,
    handlePersonalInfoSubmit,
    handleDetailsSubmit,
    handleFinalSubmit,
    goToPersonalInfo,
    goToDetails,
  } = useFitnessOnBoardingForm(onSubmit);
  const [ref, bounds] = useMeasure();

  const renderPersonalInfoStep = () => <OnBoardingPersonalInfo control={control} />;

  const renderDetailsStep = () => (
    <OnBoardingDetailsStep control={control} userName={getValues('name')} />
  );

  const renderOverviewStep = () => (
    <OnBoardingOverview
      getValues={getValues}
      handleSubmit={handleSubmit}
      handleFinalSubmit={handleFinalSubmit}
    />
  );

  return (
    <FormProvider {...methods}>
      <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0 }}>
        <motion.div animate={{ height: bounds.height }} className="w-full max-w-md mx-auto my-4">
          <Card ref={ref} className="overflow-hidden">
            <Stepper currentStep={step} direction={direction} />
            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
              <form>
                <motion.div
                  key={step}
                  variants={variants}
                  initial="initial"
                  animate="active"
                  exit="exit"
                  custom={direction}
                >
                  {step === 'name' && renderPersonalInfoStep()}
                  {step === 'details' && renderDetailsStep()}
                  {step === 'overview' && renderOverviewStep()}
                </motion.div>

                <div className="p-6 pt-0">
                  {step === 'name' && (
                    <motion.div layoutId="next" className="flex gap-2 mt-4" layout>
                      <Button onClick={handlePersonalInfoSubmit} type="submit" className="w-full">
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 'details' && (
                    <div className="grid grid-cols-2 items-center gap-2 mt-4">
                      <Button
                        type="button"
                        className="flex-1"
                        variant="outline"
                        onClick={goToPersonalInfo}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                      <motion.div layoutId="next" className="flex-1 w-full" layout>
                        <Button type="button" onClick={handleDetailsSubmit} className="w-full">
                          <motion.span layout className="flex items-center">
                            Review <ArrowRight className="ml-2 h-4 w-4" />
                          </motion.span>
                        </Button>
                      </motion.div>
                    </div>
                  )}

                  {step === 'overview' && (
                    <motion.div
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      className="flex gap-2 mt-4"
                    >
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
                    </motion.div>
                  )}
                </div>
              </form>
            </AnimatePresence>
          </Card>
        </motion.div>
      </MotionConfig>
    </FormProvider>
  );
};

const variants = {
  initial: (direction: number) => {
    return {
      x: `${110 * direction}%`,
      opacity: 0,
    };
  },
  active: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: `${-110 * direction}%`,
      opacity: 0,
    };
  },
};
export default FitnessOnboardingForm;
