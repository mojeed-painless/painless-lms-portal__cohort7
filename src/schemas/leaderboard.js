import { z } from 'zod';

export const leaderboardEntrySchema = z.object({
  rank: z.number(),
  studentId: z.string(),
  name: z.string(),
  score: z.number(),
  total: z.number(),
});

export const leaderboardResponseSchema = z.array(leaderboardEntrySchema);
