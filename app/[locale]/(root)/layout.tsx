import { ReactNode } from 'react';

import Header from '@/components/shared/header';
import LocaleProvider from '@/components/shared/locale-provider';

export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="container flex h-screen flex-col py-4 md:px-8">
      <LocaleProvider locale={locale}>
        <Header />
      </LocaleProvider>

      <main className="flex-1">{children}</main>
    </div>
  );
}
