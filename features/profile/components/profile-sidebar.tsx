'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useProfileSidebarNav } from '@/features/profile/hooks/use-profile-sidebar-nav';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cn } from '@/lib/utils';

const ProfileSidebar = () => {
  const pathname = usePathname();
  const links = useProfileSidebarNav();
  const { roles } = useCurrentUser();
  const chief = roles.find((role) => role === 'CHIEF');
  const employee = roles.find((role) => role === 'EMPLOYEE');
  const role = chief || employee;

  return (
    <aside>
      <nav>
        <ul className="flex flex-col gap-3">
          {links[role as string].links.map((link) => (
            <li
              key={link.href}
              className={cn(
                'rounded-sm text-lg transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-800',
                pathname === link.href && 'dropdown-item_active'
              )}
            >
              <Tooltip>
                <TooltipTrigger className="md:hidden">
                  <Link href={link.href} className="flex items-center gap-2 px-4 py-2">
                    <link.icon className="size-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{link.label}</TooltipContent>
              </Tooltip>

              <Link href={link.href} className="hidden items-center gap-2 px-4 py-2 md:flex">
                <link.icon className="size-6" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
