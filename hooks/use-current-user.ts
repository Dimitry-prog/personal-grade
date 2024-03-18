import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const session = useSession();

  return session?.data?.user as User;
};
