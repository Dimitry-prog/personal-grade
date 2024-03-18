'use client';

import { UserRole } from '@prisma/client';
import { ReactNode } from 'react';

import { useCurrentUser } from '@/hooks/use-current-user';

const RoleGate = ({ roles, children }: { roles: UserRole[]; children: ReactNode }) => {
  const userRoles = useCurrentUser();
  const isHasAccess = roles.some((role) => userRoles.roles.includes(role));

  if (!isHasAccess) {
    return <h2>You can not see this page</h2>;
  }

  return <>{children}</>;
};

export default RoleGate;
