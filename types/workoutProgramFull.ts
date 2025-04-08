import { z } from 'zod';

export const workoutProgramFullSchema = z.object({
  opening: z
    .string()
    .describe(
      'response of what user chat before, for example: "Here’s your full personalized workout program...."',
    ),
  programOverview: z
    .array(
      z.object({
        title: z.string().describe('title of program overview'),
        description: z.string().describe('description of program overview'),
      }),
    )
    .describe('overview of workout program, it can be level, goal, focus, workout access, etc'),
  weeklyStructure: z
    .array(
      z.object({
        title: z.string().describe('title of weekly structure'),
        description: z.string().describe('description of weekly structure'),
      }),
    )
    .describe(
      'weekly structure of workout program, it can be how many days  gonna workout, rest days, etc',
    ),
  workoutProgram: z.array(
    z
      .object({
        day: z.string().describe('day of workout or rest day'),
        place: z.string().describe('place of exercise'),
        description: z.string().describe('description of workout or rest day').optional(),
        exercises: z
          .array(
            z.object({
              exercise: z.string().describe('name of the exercise'),
              type: z.string().describe('type of exercise'),
              equipment: z.string().describe('equipment needed for the exercise'),
              sets: z.string().describe('number of sets'),
              reps: z.string().describe('number of reps'),
              rest: z.string().describe('rest time between sets'),
              notes: z.string().describe('additional notes or tips for the exercise'),
            }),
          )
          .optional(),
      })
      .describe(
        'workout program for each day, include rest day if any, rest day can be full rest or light cardio, just a description or just a day without exercise',
      ),
  ),
  additionalNotes: z
    .array(
      z.object({
        title: z.string().describe('title of additional notes'),
        description: z.string().describe('description of additional notes'),
      }),
    )
    .describe(
      'any additional notes to user it can be nutrition, recovery, rest, warm up, or anything that related to user condition',
    ),
  messages: z
    .string()
    .describe(
      'Additional information to user if any, ask if theres any information or question to add, you already have the information and already show to user, if user confirm proceed to next phase',
    ),
});

export type WorkoutProgramFullProps = z.infer<typeof workoutProgramFullSchema>;
