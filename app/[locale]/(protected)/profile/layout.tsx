import type { Metadata } from 'next';
import { ReactNode } from 'react';

import ProfileSidebar from '@/features/profile/components/profile-sidebar';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Your personal profile page',
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  return (
    <div className="flex gap-4 py-10 md:py-14">
      <ProfileSidebar />
      {children}
    </div>
  );
}
