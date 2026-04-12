import z from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../../../../shared/constants/constants';

export const schemaCreateAlbum = z.object({
  artist_id: z.string().trim(),
  name: z
    .string()
    .trim()
    .min(1, 'Name must be at least 1 characters long!')
    .max(55, 'Name must be at most 55 characters long!'),
  release_year: z
    .number()
    .refine((year) => year >= 1950 && year <= new Date().getFullYear(), {
      message:
        'Please enter a valid year of manufacture (from 1950 to the current year)',
    }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 10MB 🫠')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported 😶',
    )
    .optional()
    .nullable(),
});

export type CreateAlbumFormData = z.infer<typeof schemaCreateAlbum>;
