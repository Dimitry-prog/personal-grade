import { UserRole } from '@prisma/client';
import { z } from 'zod';

import { useScopedI18n } from '@/locales/client';

export const useUserInfoFormValidation = () => {
  const t = useScopedI18n('userInfoForm');

  const userInfoSchema = z.object({
    lastName: z.string().min(1, t('validate.required')),
    patronymic: z.string().min(1, t('validate.required')),
    position: z.string().min(1, t('validate.required')),
    role: z.nativeEnum(UserRole, {
      errorMap: () => {
        return { message: t('validate.required') };
      },
    }),
    chiefId: z.string().optional(),
    employees: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
        })
      )
      .optional(),
  });

  return userInfoSchema;
};

export const useUserInfoFormRoles = () => {
  const t = useScopedI18n('userInfoForm');
  const roles = {
    CHIEF: t('roles.CHIEF'),
    EMPLOYEE: t('roles.EMPLOYEE'),
  };

  return roles;
};
