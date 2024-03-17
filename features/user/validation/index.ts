import { UserRole } from '@prisma/client';
import { z } from 'zod';

export const useInfoSchema = z.object({
  lastName: z.string(),
  patronymic: z.string(),
  position: z.string(),
  role: z.nativeEnum(UserRole),
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
