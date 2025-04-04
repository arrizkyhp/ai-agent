import { tool } from 'ai';
import { fitnessProfileSchema } from '@/types/fitnessProfile';

const showFitnessProfile = tool({
    description: 'Show user information about fitness level, fitness goal, healthAndPhysicalCapacity, workoutAccess and message, ' +
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
        message
    }) => {
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
})

export default showFitnessProfile;
