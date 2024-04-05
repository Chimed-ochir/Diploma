import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react';
import { Header } from '@/components/Header';
import { AuthProvider } from '@/context/Account';
import { Footer } from '@/components/Footer';

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
              // style={{
              //   background: `radial-gradient(circle, rgba(15,80,138,1) 19%, rgba(10,72,129,1) 38%, rgba(1,5,30,1) 100%)`,
              // }}
              bg='white'
              gap='0'
            >
              <Stack bg='white' zIndex={'1'}>
                <Header />
              </Stack>

              {/* <Box w='100vw' h='100vh'>
                <video
                  autoPlay
                  muted
                  loop
                  id='myVideo'
                  controls={false}
                  style={{ width: '100%', height: '100%' }}
                >
                  <source src='./video5.mp4' type='video/mp4' />
                </video>{' '}
              </Box> */}
              <Stack>{children}</Stack>
              <Footer />
            </Stack>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
