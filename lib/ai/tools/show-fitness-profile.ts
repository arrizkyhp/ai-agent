import { fitnessProfileSchema } from '@/types/fitnessProfile';
import { tool } from 'ai';

export const saveFitnessProfileToLocalStorage = (profile: {
  name: string;
  age: string;
  gender: string;
  weight: string;
  fitnessLevel: string;
  fitnessGoal: string;
  healthAndPhysicalCapacity: string;
}) => {
  try {
    localStorage.setItem('fitnessProfile', JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving fitness profile to localStorage:', error);
  }
};

const showFitnessProfile = tool({
  description:
    'Show user information about fitness level, fitness goal, healthAndPhysicalCapacity, workoutAccess and message, ' +
    'on message ask if user have any additional information to share or this is okay',
  parameters: fitnessProfileSchema,
  execute: async ({
    name,
    age,
    gender,
    weight,
    fitnessLevel,
    fitnessGoal,
    healthAndPhysicalCapacity,
    introduction,
    message,
  }) => {
    saveFitnessProfileToLocalStorage({
      name: name,
      age: age,
      gender: gender,
      weight: weight,
      fitnessLevel: fitnessLevel,
      fitnessGoal: fitnessGoal,
      healthAndPhysicalCapacity: healthAndPhysicalCapacity,
    });

    console.log(name);

    return {
      name,
      age,
      gender,
      weight,
      fitnessLevel,
      fitnessGoal,
      healthAndPhysicalCapacity,
      introduction,
      message,
    };
  },
});

export default showFitnessProfile;
