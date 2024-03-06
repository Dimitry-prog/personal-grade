import { ReactNode } from 'react';

import { I18nProviderClient } from '@/locales/client';

const LocaleProvider = ({ children, locale }: { children: ReactNode; locale: string }) => {
  return (
    <I18nProviderClient locale={locale} fallback={<h2>Loading...</h2>}>
      {children}
    </I18nProviderClient>
  );
};

export default LocaleProvider;
