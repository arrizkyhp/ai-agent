import { z } from 'zod';

export const workoutProgramOverviewSchema = z.object({
  opening: z.string().describe('response of what user chat before, for example: "Great! I have all the information I need to create a overview workout program for you."'),
  overview: z.string().describe('short overview of what your workout program will look like'),
  programFocus: z.array(z.object({
    title: z.string().describe('title of program focus'),
    description: z.string().describe('description of program focus'),
  })).describe('what Program Focus you gonna make'),
  programStructure: z.array(z.object({
    icon: z.string().describe('use lucide icon'),
    title: z.string().describe('title of program structure'),
    description: z.string().describe('description of program structure'),
  })).describe('what Program Structure you gonna make'),
  otherProgram: z.array(z.object({
    title: z.string().describe('title of other program'),
    description: z.string().describe('description of other program'),
    examples: z.array(z.object({
      title: z.string().describe('title of example of other program'),
      description: z.string().describe('description of example of other program'),
      list: z.array(z.object({
        title: z.string().describe('title of list example of other program'),
        description: z.string().describe('description of list example of other program'),
      })).describe('list of example of other program').optional(),
    })).describe('example of other program if any, for example schedule meal or list meal, add list if data is list type, if not just use description').optional(),
  })).describe('other program that fit on user, ' +
    'anything it can be one or more for example: "Example Splits", "Example Nutrition", "Type of Exercises" or anything its up to you but adjust with user condition' ),
  additionalNotes: z.array(z.object({
    title: z.string().describe('title of additional notes'),
    description: z.string().describe('description of additional notes'),
  })).describe('any additional notes to user it can be nutrition, recovery, rest, warm up, or anything that related to user condition'),
  messages: z.string().describe('Additional information to user if any, ask if theres any information or question to add, you already have the information and already show to user, if user confirm proceed to next phase'),
});

export type WorkoutProgramOverviewProps = z.infer<typeof workoutProgramOverviewSchema>;
