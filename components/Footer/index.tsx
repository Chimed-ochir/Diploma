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

export const Footer = () => {
  const path = usePathname();

  return (
    <Stack
      w='100%'
      bg='#0C2955'
      // bg='white'
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
        <Text color='white'>Footer</Text>
      </Stack>
    </Stack>
  );
};
