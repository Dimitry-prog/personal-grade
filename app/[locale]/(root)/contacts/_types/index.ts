import { z } from 'zod';

import { contactFormSchema } from '@/app/[locale]/(root)/contacts/_validation';

export type ContactFormDataType = z.infer<typeof contactFormSchema>;
