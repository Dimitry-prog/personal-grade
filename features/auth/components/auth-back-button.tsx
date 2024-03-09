import Link from 'next/link';

import { Button } from '@/components/ui/button';

type AuthBackButtonProps = {
  label: string;
  href: string;
};

const AuthBackButton = ({ label, href }: AuthBackButtonProps) => {
  return (
    <Button asChild variant="link" size="sm" className="font-normal text-muted-foreground">
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default AuthBackButton;
