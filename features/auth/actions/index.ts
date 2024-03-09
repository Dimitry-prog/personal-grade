'use server';

import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { LoginFormType, RegisterFormType } from '@/features/auth/types';
import { loginSchema, registerSchema } from '@/features/auth/validation';
import { signIn } from '@/lib/auth';
import { loginRedirect } from '@/lib/constants';
import { db } from '@/lib/db';
import { getScopedI18n } from '@/locales/server';
import { getUserByEmail } from '@/services/user';

export const login = async (data: LoginFormType) => {
  const validatedFields = loginSchema.safeParse(data);
  const t = await getScopedI18n('serverMessages');

  if (!validatedFields.success) {
    return {
      error: t('invalidFields'),
    };
  }

  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser?.password) {
    return {
      error: t('emailInDifferentProvider'),
    };
  }

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: t('invalidCredentials'),
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: loginRedirect,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof AuthError) {
      switch (e.type) {
        case 'CredentialsSignin':
          return {
            error: t('invalidCredentials'),
          };
        case 'OAuthAccountNotLinked':
          return {
            error: t('emailInDifferentProvider'),
          };
        case 'AuthorizedCallbackError':
          return {
            error: t('authErr'),
          };
        default:
          return {
            error: t('smtWentWrong'),
          };
      }
    }
    throw e;
  }
};

export const register = async (data: RegisterFormType) => {
  const validatedFields = registerSchema.safeParse(data);
  const t = await getScopedI18n('serverMessages');

  if (!validatedFields.success) {
    return {
      error: t('invalidFields'),
    };
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: t('emailExist'),
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      data: user,
      error: null,
    };
  } catch (e) {
    console.log(e);
    return {
      error: t('failedCreate', { params: 'user' }),
    };
  }
};
