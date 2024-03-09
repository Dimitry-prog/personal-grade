import { BsExclamationTriangle } from 'react-icons/bs';

import AuthFormWrapper from '@/features/auth/components/auth-form-wrapper';
import { getScopedI18n } from '@/locales/server';

const AuthErrorPage = async () => {
  const t = await getScopedI18n('authentication.errorPage');

  return (
    <AuthFormWrapper
      title={t('title')}
      backButtonLabel={t('btnLabel')}
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center text-destructive">
        <BsExclamationTriangle className="size-8" />
      </div>
    </AuthFormWrapper>
  );
};

export default AuthErrorPage;
