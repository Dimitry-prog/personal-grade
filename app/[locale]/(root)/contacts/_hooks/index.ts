import { z } from 'zod';

import { useScopedI18n } from '@/locales/client';

export const useContactFormValidation = () => {
  const t = useScopedI18n('contactsPage.validate');

  const contactFormSchema = z.object({
    name: z.string().min(1, t('required')),
    message: z.string().min(1, t('required')),
    email: z.string().email(t('email')),
  });

  return contactFormSchema;
};
