'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ChangeLocales from '@/components/shared/change-locales';
import ChangeTheme from '@/components/shared/change-theme';
import Logo from '@/components/shared/logo';
import MobileNav from '@/components/shared/mobile-nav';
import { Button } from '@/components/ui/button';
import { useHeaderLinks } from '@/hooks/use-header-links';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

const Header = () => {
  const pathname = usePathname();
  const headerLinks = useHeaderLinks();
  const t = useScopedI18n('auth');

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center justify-between gap-8">
        <Logo />

        <nav className="hidden lg:block">
          <ul className="flex gap-4">
            {headerLinks.map((link) => (
              <li
                key={link.id}
                className={cn(
                  'hover-text text-xl',
                  pathname === link.href && 'text-muted-foreground underline underline-offset-2'
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="hidden items-center justify-between gap-4 lg:flex">
        <ChangeLocales />
        <ChangeTheme />

        <div className="flex items-center justify-between gap-4">
          <Button asChild>
            <Link href="/sign-in">{t('login')}</Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="/sign-up">{t('register')}</Link>
          </Button>
        </div>
      </div>

      <MobileNav />
    </header>
  );
};

export default Header;
