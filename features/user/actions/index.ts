'use server';

import { UserRole } from '@prisma/client';

import { UserInfoFormType } from '@/features/user/types';
import { db } from '@/lib/db';
import { getScopedI18n } from '@/locales/server';

export const getChiefs = async (userId: string) => {
  const t = await getScopedI18n('serverMessages');

  try {
    const chiefs = await db.user.findMany({
      where: {
        roles: {
          has: UserRole.CHIEF,
        },
        NOT: {
          id: userId,
        },
      },
    });

    return {
      data: chiefs || [],
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      error: t('failedToFetch', { params: t('params.chiefs') }),
    };
  }
};

export const getUsersWithoutChief = async (userId: string) => {
  const t = await getScopedI18n('serverMessages');

  try {
    const users = await db.user.findMany({
      where: {
        chiefId: {
          equals: null,
        },
        NOT: {
          roles: {
            has: UserRole.CHIEF,
          },
        },
        AND: {
          NOT: {
            id: userId,
          },
        },
      },
    });

    return {
      data: users || [],
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      error: t('failedToFetch', { params: t('params.users') }),
    };
  }
};

export const updateUserInfo = async (data: UserInfoFormType, userId: string) => {
  const t = await getScopedI18n('serverMessages');

  try {
    const user = await db.user.update({
      where: {
        id: userId,
        NOT: {
          roles: {
            has: data.role as UserRole,
          },
        },
      },
      data: {
        lastName: data.lastName,
        patronymic: data.patronymic,
        position: data.position,
        roles: {
          push: data.role as UserRole,
        },
        chiefId: data.chiefId ? data.chiefId : null,
        employees: {
          connect: data.employees?.map((employee) => ({ id: employee.id })) || [],
        },
      },
    });

    return {
      data: user,
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      error: t('failedToUpdate', { params: t('params.user') }),
    };
  }
};
