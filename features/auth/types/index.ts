import { z } from 'zod';

import { loginSchema, registerSchema } from '@/features/auth/validation';

export type AuthFormType = LoginFormType | RegisterFormType;

export type LoginFormType = z.infer<typeof loginSchema>;

export type RegisterFormType = z.infer<typeof registerSchema>;
