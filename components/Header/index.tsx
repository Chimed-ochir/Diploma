'use client'; // components/Navbar.js
import { useAuth } from '@/context/Account';
import {
  Link as ChakraLink,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Header = () => {
  const path = usePathname();
  const [currentTab, setCurrentTab] = useState('Home');

  useEffect(() => {
    const tabs = ['Home', 'Verify', 'Upload', 'Admin'];
    const matchingTab = tabs.find((tab) => {
      if (path === '') {
        return 'Home';
      } else {
        if (path === `/${tab.toLowerCase()}`) {
          return tab;
        }
      }
    });

    if (matchingTab) {
      setCurrentTab(matchingTab);
    }
  }, [path]);
  const { connect, disconnect, address } = useAuth();
  return (
    <Stack
      w='100%'
      bg='#0C2955'
      boxShadow='0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
    >
      <Stack
        direction={'row'}
        h='100px'
        w='80%'
        alignItems={'center'}
        mx='auto'
        justifyContent={'space-between'}

        // justifyContent={'space-between'}
      >
        <Stack>
          <Image
            src='./logo6.png'
            w='180px'
            h='70px'
            alt='Diploma icon'
          ></Image>
        </Stack>

        <Stack
          direction={'row'}
          w='600px'
          justifyContent={'space-around'}
          ml={'40px'}
        >
          {['Home', 'Verify', 'Upload', 'Admin'].map((tab) => (
            <Link
              href={`/${tab === 'Home' ? '/' : tab.toLowerCase()}`}
              key={tab}
              passHref
            >
              <Text
                borderBottom={
                  currentTab === tab
                    ? '2px solid #2E68FF'
                    : '2px solid transparent'
                }
                cursor='pointer'
                fontSize='18px'
                fontWeight={currentTab === tab ? '600' : '300'}
                lineHeight='27px'
                onClick={() => setCurrentTab(tab)}
                py='6px'
                px={'10px'}
                color={'white'}
              >
                {tab}
              </Text>
            </Link>
          ))}
        </Stack>
        {address !== 'n/a' ? (
          <Button onClick={() => disconnect()}>Logout</Button>
        ) : (
          <Button onClick={() => connect()}>Login</Button>
        )}
      </Stack>
    </Stack>
  );
};
