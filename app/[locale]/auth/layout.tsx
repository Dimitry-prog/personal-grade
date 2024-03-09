import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Authentication on Personal Grade',
  description: 'Complete authentication and grow your people with us',
};

export default async function Layout({ children }: { children: ReactNode }) {
  return <section className="py-10 md:py-14">{children}</section>;
}
