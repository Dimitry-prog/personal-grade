'use client';

import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ChangeLocales from '@/components/shared/change-locales';
import ChangeTheme from '@/components/shared/change-theme';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHeaderLinks } from '@/hooks/use-header-links';
import { cn } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';

const MobileNav = () => {
  const pathname = usePathname();
  const headerLinks = useHeaderLinks();
  const t = useScopedI18n('auth');

  return (
    <div className="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MenuIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="divide-y-2">
          <nav className="py-2 pb-4">
            <ul className="flex flex-col gap-1">
              {headerLinks.map((link) => (
                <li key={link.id}>
                  <DropdownMenuItem
                    className={cn(
                      'rounded-sm px-4 py-1 text-lg',
                      pathname === link.href && 'dropdown-item_active'
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </DropdownMenuItem>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full items-center justify-between gap-4">
              <ChangeLocales />
              <ChangeTheme />
            </div>

            <div className="flex items-center justify-between gap-4 ">
              <Button asChild>
                <Link href="/sign-in">{t('login')}</Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/sign-up">{t('register')}</Link>
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MobileNav;
