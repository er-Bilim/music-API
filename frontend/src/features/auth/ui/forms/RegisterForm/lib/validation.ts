import z from 'zod';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
} from '../../../../../../shared/constants/constants';

export const schemaRegister = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(25, { message: 'Username must be at most 25 characters long!' })
    .regex(
      /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/,
      'Invalid email format (name@example1.com) - lower case',
    ),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long!' })
    .max(32, { message: 'Password must be at most 32 characters long!' }),
  displayName: z
    .string()
    .trim()
    .min(3, { message: 'Display name must be at least 3 characters long!' })
    .max(32, { message: 'Display name must be at most 32 characters long!' })
    .regex(/^[a-zA-Z\s]*$/),
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

export type RegisterFormData = z.infer<typeof schemaRegister>;
