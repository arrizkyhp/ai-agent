import { workoutProgramOverviewSchema } from '@/types/workoutProgramOverview';
import { tool } from 'ai';

const workoutProgramOverview = tool({
  description:
    'Show user an information about workout program overview after you get ' +
    'their fitness profile and before go to make full personalized workout program, ' +
    'start with a overview of what your workout program will look like, just short ' +
    'and end with a question to user if they have any additional information to share or this is okay' +
    'the in between is up to you, but make sure to include the following: ' +
    'add youtube link for each exercise if any, ' +
    'Program Focus, Program Structure and end with Additional Notes if any',
  parameters: workoutProgramOverviewSchema,
  execute: async ({
    opening,
    overview,
    programFocus,
    programStructure,
    otherProgram,
    additionalNotes,
    messages,
  }) => {
    return {
      opening,
      overview,
      programFocus,
      programStructure,
      otherProgram,
      additionalNotes,
      messages,
    };
  },
});

export default workoutProgramOverview;
