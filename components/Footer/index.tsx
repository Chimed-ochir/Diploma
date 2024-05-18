'use client'; // components/Navbar.js
import { useAuth } from '@/context/Account';
import {
  Link as ChakraLink,
  Text,
  Stack,
  Image,
  Button,
  Show,
} from '@chakra-ui/react';
import { Flex, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const Footer = ({
  contact,
  menu,
  head1,
  head2,
  head3,
}: {
  contact: string;
  menu: string;
  head1: string;
  head2: string;
  head3: string;
}) => {
  return (
    <Stack
      w='100%'
      // style={{
      //   background: `linear-gradient(260deg, rgba(1,5,30,1) 0%, rgba(148,13,186,1) 50%, rgba(1,5,30,1) 100%)`,
      // }}
      bg='black'
      boxShadow='0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
      borderTop='1px solid white'
      pb='10px'
    >
      <Stack
        w='80%'
        alignItems={'center'}
        mx='auto'
        justifyContent={'space-between'}
        color='white'
        fontSize={'28px'}
        pt='20px'

        // justifyContent={'space-between'}
      >
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          spacing={'8'}
          w='100%'
          justifyContent={'space-between'}
          alignItems={'flex-start'}
        >
          <Show above='lg'>
            {' '}
            <Stack minW='220px' w='220px'>
              <Image
                src='/myLogo.png'
                w='220px'
                h='60px'
                alt='Diploma icon'
              ></Image>
            </Stack>
          </Show>

          <Stack>
            <Text fontSize={'20px'}>{menu}</Text>
            <Text fontSize={'16px'} cursor={'pointer'} color='#B7BDC6'>
              {head1}
            </Text>
            <Text fontSize={'16px'} cursor={'pointer'} color='#B7BDC6'>
              {head2}
            </Text>
            <Text fontSize={'16px'} cursor={'pointer'} color='#B7BDC6'>
              {head3}
            </Text>
          </Stack>
          <Stack>
            <Text fontSize={'20px'}>{contact}</Text>
            <Text fontSize={'16px'} color='#B7BDC6'>
              Diploma@gmail.com
            </Text>
            <Text fontSize={'16px'} color='#B7BDC6'>
              99112345
            </Text>
            <Stack color='#B7BDC6' direction={'row'}>
              <a href='#'>
                <Icon as={FaFacebook} />
              </a>
              <a href='#'>
                <Icon as={FaTwitter} />
              </a>
              {/* <a href='#'>
            <Icon as={FaGithub} />
          </a> */}
              <a href='#'>
                <Icon as={FaInstagram} />
              </a>
            </Stack>
          </Stack>
        </Stack>

        <Text textAlign={{ base: 'left' }} color='#B7BDC6' fontSize={'20px'}>
          Diploma © All Copyright 2024
        </Text>
      </Stack>
    </Stack>
  );
};
