import { tool } from 'ai';
import { z } from "zod";

const showFitnessProfile = tool({
    description: 'Show user information about fitness level, fitness goal, healthAndPhysicalCapacity, workoutAccess and message, ' +
        'on message ask if user have any additional information to share or this is okay',
    parameters: z.object({
        fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('Get user information fitness level'),
        fitnessGoal: z.enum(['Building Muscle', 'Losing Fat', 'Improve endurance', 'General Fitness']).describe('Get user information fitness goal'),
        healthAndPhysicalCapacity: z.string().describe('Get user physical limitations or past injuries'),
        workoutAccess: z.enum(['gym', 'home']).describe('Get user have access to a gym or prefer to workout at home'),
        message: z.string().describe('Greetings or Introduction and Additional information to user if any, you already have the information and already show to user'),
    }),
    execute: async ({ fitnessLevel, fitnessGoal, healthAndPhysicalCapacity, message }) => {
        return {
            fitnessLevel,
            fitnessGoal,
            healthAndPhysicalCapacity,
            message,
        };
    },
})

export default showFitnessProfile;
