import { ReactNode } from 'react';

import LocaleProvider from '@/components/shared/locale-provider';

export default async function Layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <LocaleProvider locale={locale}>
      <div className="container flex h-screen flex-col py-4 md:px-8">
        <main className="flex-1">{children}</main>
      </div>
    </LocaleProvider>
  );
}
