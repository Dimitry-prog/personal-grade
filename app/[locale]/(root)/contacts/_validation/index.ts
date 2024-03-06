import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  message: z.string().min(1, 'Required'),
  email: z.string().email('Required'),
});
