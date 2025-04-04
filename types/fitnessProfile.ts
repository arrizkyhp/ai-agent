// Define schema as a constant
import { z } from 'zod';

export const fitnessProfileSchema = z.object({
  name: z.string().describe('Get user information name'),
  age: z.string().describe('Get user information age'),
  gender: z.string().describe('Get user information gender'),
  weight: z.string().describe('Get user information weight'),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']).describe('Get user information fitness level'),
  fitnessGoal: z.enum(['Building Muscle', 'Losing Fat', 'Improve endurance', 'General Fitness']).describe('Get user information fitness goal'),
  healthAndPhysicalCapacity: z.string().describe('Get user physical limitations or past injuries'),
  workoutAccess: z.enum(['gym', 'home']).describe('Get user have access to a gym or prefer to workout at home'),
  introduction: z.string().describe('Warm greetings or Introduction about yourself to user, you are AI Assistant fitness that will help user'),
  message: z.string().describe('Additional information to user if any, ask if theres any information or question to add, ' +
    'dont use word Great! or anything like that on first word, because its already on introduction' +
    'you already have the information and already show to user'),
});

// Create TypeScript interface from the zod schema
export type FitnessProfileProps = z.infer<typeof fitnessProfileSchema>;
