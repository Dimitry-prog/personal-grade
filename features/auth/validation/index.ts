import { z } from 'zod';

export const loginSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string(),
});
