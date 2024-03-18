import '../globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import Header from '@/components/shared/header';
import LocaleProvider from '@/components/shared/locale-provider';
import ThemeProvider from '@/components/shared/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Personal Grade',
  description: 'Grow your people with us',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const session = await auth();

  return (
    <html lang={locale}>
      <SessionProvider session={session}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster
              position="top-center"
              richColors
              toastOptions={{
                classNames: {
                  title: 'text-base',
                },
              }}
            />
            <TooltipProvider delayDuration={300}>
              <div className="container flex h-screen flex-col py-4 md:px-8">
                <LocaleProvider locale={locale}>
                  <Header />

                  <main className="flex-1">{children}</main>
                </LocaleProvider>
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
