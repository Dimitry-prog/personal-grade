import { ReactNode } from 'react';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import AuthBackButton from '@/features/auth/components/auth-back-button';
import AuthSocials from '@/features/auth/components/auth-socials';

type AuthFormWrapperProps = {
  children: ReactNode;
  title: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocials?: boolean;
};

const AuthFormWrapper = ({
  children,
  showSocials,
  title,
  backButtonLabel,
  backButtonHref,
}: AuthFormWrapperProps) => {
  return (
    <Card className="mx-auto max-w-xl self-center">
      <CardHeader>
        <h2 className="text-center">{title}</h2>
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocials && (
        <CardFooter>
          <AuthSocials />
        </CardFooter>
      )}

      <CardFooter className="justify-center">
        <AuthBackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
