'use client'; // Ensure this code runs on the client side

import { useAuth } from '@/context/Account';
import { Button } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';

interface LanguageSwitcherProps {
  query?: { [key: string]: any };
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ query }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { fullPath } = useAuth();

  const handleNavigation = (locale: string) => {
    const path = fullPath(query, locale); // Include locale in the full path
    router.push(path); // Push the full path without additional options
  };

  return (
    <div>
      {pathname.startsWith('/mn') ? (
        <Button onClick={() => handleNavigation('en')}>EN</Button>
      ) : (
        <Button onClick={() => handleNavigation('mn')}>MN</Button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
