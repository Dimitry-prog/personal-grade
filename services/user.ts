import { User } from '@prisma/client';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const currentUser = async () => {
  const session = await auth();

  return session?.user as User;
};
