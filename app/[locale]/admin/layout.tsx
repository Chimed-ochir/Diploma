import { Stack } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

// Assign the custom window object
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // if (
  //   (typeof window !== 'undefined' &&
  //     window.localStorage.getItem('userAddress') !==
  //       '0x896715dC4eAF034785B3b5a1f7078478ac24e77f') ||
  //   typeof window === 'undefined'
  // ) {
  //   redirect('/');
  // }
  // console.log(
  //   'window.localStorage.getItem(userAddres)',
  //   window.localStorage.getItem('userAddress')
  // );
  return <Stack>{children}</Stack>;
}
