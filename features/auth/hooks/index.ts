import { z } from 'zod';

import { useScopedI18n } from '@/locales/client';

export const useAuthFormValidation = () => {
  const t = useScopedI18n('authentication.validate');

  const loginSchema = z.object({
    email: z.string().min(1, t('required')).email(t('email')),
    password: z.string().min(1, t('required')),
  });

  const registerSchema = z.object({
    name: z.string().min(1, t('required')),
    email: z.string().min(1, t('required')).email(t('email')),
    password: z.string().min(1, t('required')),
  });

  return {
    loginSchema,
    registerSchema,
  };
};
