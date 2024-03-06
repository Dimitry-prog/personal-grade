import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container flex h-screen flex-col py-4 md:px-8">
      <main className="flex-1">{children}</main>
    </div>
  );
}
