import z from 'zod';

export const schemaCreateTrack = z.object({
  album_id: z.string().trim(),
  name: z
    .string()
    .trim()
    .min(1, 'Name must be at least 1 characters long!')
    .max(55, 'Name must be at most 55 characters long!'),
  time: z
    .string()
    .trim()
    .regex(
      /^([0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      'Enter the time in the HH:MM format (for example, 15:45)',
    ),
  youtubeLink: z
    .string()
    .regex(
      /^https:\/\/(www\.)?youtube\.com\/|^https:\/\/youtu\.be\//,
      'Only youtube link (for example, https://www.youtube.com/example)',
    ),
});

export type CreateTrackFormData = z.infer<typeof schemaCreateTrack>;
