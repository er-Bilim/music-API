import z from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../../../shared/constants/constants';

export const schemaCreateArtist = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name must be at least 1 characters long!')
    .max(55, 'Name must be at most 55 characters long!'),
  information: z
    .string()
    .trim()
    .max(500, 'Information must be at most 55 characters long!'),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max image size is 10MB 🫠')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported 😶',
    ),
});

export type CreateArtistFormData = z.infer<typeof schemaCreateArtist>;
