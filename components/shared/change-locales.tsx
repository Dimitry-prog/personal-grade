'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useChangeLocale, useCurrentLocale, useScopedI18n } from '@/locales/client';

const ChangeLocales = () => {
  const changeLocale = useChangeLocale({ preserveSearchParams: true });
  const currentLocale = useCurrentLocale();
  const t = useScopedI18n('locales');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {currentLocale.toUpperCase()}
          <span className="sr-only">Toggle locales</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => changeLocale('en')}
          className={cn(currentLocale === 'en' && 'dropdown-item_active')}
        >
          {t('en')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeLocale('ru')}
          className={cn(currentLocale === 'ru' && 'dropdown-item_active')}
        >
          {t('ru')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeLocales;
