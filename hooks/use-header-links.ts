import { v4 as uuidv4 } from 'uuid';

import { useScopedI18n } from '@/locales/client';

export const useHeaderLinks = () => {
  const t = useScopedI18n('headerLink');

  return [
    {
      id: uuidv4(),
      label: t('home'),
      href: '/',
    },
    {
      id: uuidv4(),
      label: t('info'),
      href: '/info',
    },
    {
      id: uuidv4(),
      label: t('contacts'),
      href: '/contacts',
    },
    {
      id: uuidv4(),
      label: t('profile'),
      href: '/profile',
    },
  ];
};
