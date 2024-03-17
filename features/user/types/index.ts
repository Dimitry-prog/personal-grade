import { z } from 'zod';

import { useInfoSchema } from '@/features/user/validation';

export type UserInfoFormType = z.infer<typeof useInfoSchema>;
