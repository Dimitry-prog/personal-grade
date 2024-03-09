import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { loginRedirect } from '@/lib/constants';
import { useScopedI18n } from '@/locales/client';

const AuthSocials = () => {
  const t = useScopedI18n('authentication.socials');

  const handleLogin = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: loginRedirect,
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-center">
        <div className="flex h-[1px] flex-1 items-stretch bg-muted-foreground/70" />
        <p className="px-4 text-lg text-muted-foreground">{t('or')}</p>
        <div className="flex h-[1px] flex-1 items-stretch bg-muted-foreground/70" />
      </div>

      <div className="flex w-full items-center gap-x-2">
        <Button
          onClick={() => handleLogin('google')}
          asChild
          variant="outline"
          size="lg"
          className="w-full cursor-pointer py-2"
        >
          <FcGoogle />
        </Button>

        <Button
          onClick={() => handleLogin('github')}
          asChild
          variant="outline"
          size="lg"
          className="w-full cursor-pointer py-2"
        >
          <FaGithub />
        </Button>
      </div>
    </div>
  );
};

export default AuthSocials;
