import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react';
import { Header } from '@/components/Header';
import { AuthProvider } from '@/context/Account';
import { Head } from 'next/document';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Diploma',
  description: 'Blockchain verify ',
};

// Assign the custom window object
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <ChakraProvider>
          <AuthProvider>
            <Stack
              bg='white'
              gap='0'
              // backgroundImage='url(https://images.theconversation.com/files/121656/original/image-20160509-23367-kxbc3k.jpg?ixlib=rb-1.1.0&rect=345%2C0%2C2178%2C1059&q=45&auto=format&w=1356&h=668&fit=crop)'
              // backgroundSize={'cover'}
              // backgroundPosition='center'
              // backgroundRepeat={'no-repeat'}
            >
              <Stack bg='white' zIndex={'1'}>
                <Header />
              </Stack>
              <Stack w='80%' mx='auto' pt='20px'>
                {children}
              </Stack>
            </Stack>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
