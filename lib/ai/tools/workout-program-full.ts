import { workoutProgramFullSchema } from '@/types/workoutProgramFull';
import { tool } from 'ai';

const workoutProgramFull = tool({
  description:
    'Create a full personalized workout program for user based on their fitness profile and overview that have been generated before, ' +
    'start with a short introduction and then provide the full workout program, ' +
    'start with a program overview,' +
    '- must add is: Goal, Focus, Frequency or Workout days, Rest Days ' +
    '- the rest is up to you but adjust it to the program' +
    'then provide the full workout program, ' +
    'the program should include: ' +
    '- Day (use Day 1, Day 2 format or Monday, Tuesday format), ' +
    '- Exercise (name of the exercise), ' +
    '- Type (type of exercise, e.g. strength, cardio, flexibility), ' +
    '- Place (where the exercise will be performed, e.g. gym, home), ' +
    '- Equipment (equipment needed for the exercise), ' +
    '- Sets (number of sets), ' +
    '- Reps (number of reps), ' +
    '- Rest (rest time between sets), ' +
    '- Notes (any additional notes or tips for the exercise), ' +
    'and end with Additional Notes if any, it can be Rest Between sets, Nutrition & Recovery, Sleep, or anything up to you but adjust with program',
  parameters: workoutProgramFullSchema,
  execute: async ({
    opening,
    programOverview,
    weeklyStructure,
    workoutProgram,
    additionalNotes,
    messages,
  }) => {
    return {
      opening,
      programOverview,
      weeklyStructure,
      workoutProgram,
      additionalNotes,
      messages,
    };
  },
});

export default workoutProgramFull;
