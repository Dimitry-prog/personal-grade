import { GiftIcon, HomeIcon, LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';
import { AiOutlineTeam } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { PiChats } from 'react-icons/pi';

import { useScopedI18n } from '@/locales/client';

type LinkType = {
  label: string;
  href: string;
  icon: LucideIcon | IconType;
};

type LinksType = {
  [key: string]: {
    links: LinkType[];
  };
};

export const useProfileSidebarNav = () => {
  const t = useScopedI18n('profilePage.sidebar');

  const links: LinksType = {
    CHIEF: {
      links: [
        {
          label: t('home'),
          href: '/',
          icon: HomeIcon,
        },
        {
          label: t('profile'),
          href: '/profile',
          icon: CgProfile,
        },
        {
          label: t('team'),
          href: '/team',
          icon: AiOutlineTeam,
        },
        {
          label: t('chats'),
          href: '/chats',
          icon: PiChats,
        },
        {
          label: t('gifts'),
          href: '/gifts',
          icon: GiftIcon,
        },
      ],
    },
    EMPLOYEE: {
      links: [
        {
          label: t('home'),
          href: '/',
          icon: HomeIcon,
        },
        {
          label: t('profile'),
          href: '/profile',
          icon: CgProfile,
        },
        {
          label: t('chats'),
          href: '/chats',
          icon: PiChats,
        },
        {
          label: t('team'),
          href: '/team',
          icon: AiOutlineTeam,
        },
        {
          label: t('gifts'),
          href: '/gifts',
          icon: GiftIcon,
        },
      ],
    },
  };

  return links;
};
