'use client'; // components/Navbar.js
import { useAuth } from '@/context/Account';
import {
  Link as ChakraLink,
  Text,
  Stack,
  Image,
  Button,
  Show,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerFooter,
  DrawerCloseButton,
  DrawerContent,
  DrawerBody,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import { IoMenu } from 'react-icons/io5';
import { ImHome2 } from 'react-icons/im';

export const Header = ({
  locale,
  home1,
  home2,
  home3,
  login,
  logout,
  admin,
}: {
  locale: string;
  home1: string;
  home2: string;
  home3: string;
  login: string;
  logout: string;
  admin: string;
}) => {
  const path = usePathname();
  const [currentTab, setCurrentTab] = useState('Home');
  const [tabs1, setTabs] = useState(['Home', 'Verify']);
  const tabs = ['Home', 'Verify'];
  const { connect, disconnect, address } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const accounts = [
  //   '0x896715dc4eaf034785b3b5a1f7078478ac24e77f',
  //   '0xc48b5c6bfad52b536c523ad5fe2484dfd4fbde2b',
  //   '0x44aa9b64f2ddd1be45c2fad3cebc6f212750739f',
  //   '0xdb7343fff975b98d64aa3c333e0b246ad71d175d',
  // ];
  useEffect(() => {
    console.log(
      'typeof window',
      typeof window,
      window.localStorage.getItem('userAddress')
    );
    if (
      typeof window != 'undefined' &&
      window.localStorage.getItem('userAddress') ==
        '0x896715dc4eaf034785b3b5a1f7078478ac24e77f'
    ) {
      console.log('876543345678-----');
      tabs.push('Admin');

      const isAdminTabPresent = tabs1.includes('Admin'); // Simplified check with includes()

      if (!isAdminTabPresent) {
        // If 'Admin' is not found, add it to tabs1
        setTabs([...tabs1, 'Admin']);
      }
    } else {
      if (tabs1.includes('Admin')) {
        // Remove 'Admin' if it exists in tabs1
        setTabs(tabs1.filter((tab) => tab !== 'Admin'));
      }
    }

    const matchingTab = tabs1.find((tab) => {
      if (path === `/${locale}`) {
        return 'Home';
      } else {
        if (path === `/${locale}/${tab.toLowerCase()}`) {
          return tab;
        }
      }
    });

    if (matchingTab) {
      setCurrentTab(matchingTab);
    }
  }, [path, address]);

  console.log('path', path);
  console.log('tabs11', tabs1);
  console.log('locale', locale);
  if (address !== 'n/a' && address) {
    const TabPresent = tabs1.includes('Upload');
    // If address is truthy, add 'Upload' tab
    if (!TabPresent) {
      setTabs([...tabs1, 'Upload']);
    }
  } else {
    // If address is falsy, remove 'Upload' tab if it exists
    const index = tabs1.indexOf('Upload');
    if (index !== -1) {
      tabs1.splice(index, 1);
    }
  }
  const router = useRouter();
  // Use a common translation file
  // useEffect(() => {
  //   path.includes;
  // }, [path]);
  console.log('-----currentTab------', currentTab);

  return (
    <Stack
      w='100%'
      // style={{
      //   background: `linear-gradient(260deg, rgba(148,13,186,1) 0%, rgba(1,5,30,1) 41%, rgba(1,5,30,1) 59%, rgba(148,13,186,1) 100%)`,
      // }}
      bg='black'
      borderBottom='1px solid white'
    >
      <Stack
        direction={'row'}
        h='100px'
        w='80%'
        alignItems={'center'}
        mx='auto'
        justifyContent={'space-between'}
      >
        <Stack>
          <Image
            src='/myLogo.png'
            w='220px'
            h='60px'
            alt='Diploma icon'
          ></Image>
        </Stack>
        <Show above='lg'>
          <Stack
            direction={'row'}
            w='600px'
            justifyContent={'space-around'}
            ml={'40px'}
          >
            {tabs1.map((tab) => (
              <Link
                href={`/${
                  tab === 'Home' ? '' : `${locale}/${tab.toLowerCase()}`
                }`}
                key={tab}
                passHref
              >
                <Text
                  borderBottom={
                    currentTab === tab
                      ? '2px solid #B7BDC6'
                      : '2px solid transparent'
                  }
                  cursor='pointer'
                  fontSize='18px'
                  fontWeight={currentTab === tab ? '600' : '300'}
                  lineHeight='27px'
                  onClick={() => setCurrentTab(tab)}
                  py='6px'
                  px={'10px'}
                  color={'#B7BDC6'}
                >
                  {tab === 'Home'
                    ? home1
                    : tab === 'Upload'
                    ? home3
                    : tab === 'Verify'
                    ? home2
                    : tab === 'Admin'
                    ? admin
                    : ''}
                </Text>
              </Link>
            ))}
          </Stack>
          <Stack direction='row'>
            {address !== 'n/a' ? (
              <Button onClick={() => disconnect()} bg='#3874FF' color='white'>
                {logout}
              </Button>
            ) : (
              <Button onClick={() => connect()} bg='#3874FF' color='white'>
                {login}
              </Button>
            )}

            <LanguageSwitcher />
          </Stack>
        </Show>
        <Show below='lg'>
          <>
            <IoMenu
              onClick={onOpen}
              color='white'
              cursor='pointer'
              size='40px'
            />

            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent bg={'#23262f'} color='white'>
                <DrawerCloseButton />

                <DrawerBody>
                  <Stack
                    direction={'column'}
                    mt='60px'
                    justifyContent={'space-around'}
                    gap='12px'
                  >
                    {tabs1.map((tab) => (
                      <Link
                        href={`/${
                          tab === 'Home' ? '' : `${locale}/${tab.toLowerCase()}`
                        }`}
                        onClick={onClose}
                        key={tab}
                        passHref
                      >
                        <Text
                          borderBottom={'1px solid white'}
                          cursor='pointer'
                          fontSize='18px'
                          fontWeight={currentTab === tab ? '600' : '300'}
                          lineHeight='27px'
                          onClick={() => setCurrentTab(tab)}
                          py='6px'
                          px={'10px'}
                          color={'white'}
                        >
                          {tab === 'Home'
                            ? home1
                            : tab === 'Upload'
                            ? home3
                            : tab === 'Verify'
                            ? home2
                            : tab === 'Admin'
                            ? admin
                            : ''}
                        </Text>
                      </Link>
                    ))}
                  </Stack>
                </DrawerBody>

                <DrawerFooter justifyContent={'space-between'}>
                  {address !== 'n/a' ? (
                    <Button
                      onClick={() => disconnect()}
                      bg='#3874FF'
                      color='white'
                    >
                      {logout}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => connect()}
                      bg='#3874FF'
                      color='white'
                    >
                      {login}
                    </Button>
                  )}
                  <LanguageSwitcher />
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Show>
      </Stack>
    </Stack>
  );
};
