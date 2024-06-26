import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Box, ChakraProvider, Stack } from '@chakra-ui/react';
import { Header } from '@/components/Header';
import { AuthProvider } from '@/context/Account';
import { Footer } from '@/components/Footer';
import { useTranslations } from 'next-intl';

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
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const t = useTranslations('Home');
  return (
    <html lang={locale}>
      <body className={poppins.className}>
        <ChakraProvider>
          <AuthProvider>
            <Stack
              // style={{
              //   background: `radial-gradient(circle, rgba(148,13,186,1) 1%, rgba(1,5,30,1) 100%)`,
              // }}
              bg='#23262f'
              gap='0'
            >
              <Stack bg='black' zIndex={'1'}>
                <Header
                  locale={locale}
                  home1={t('head1')}
                  home2={t('head2')}
                  home3={t('head3')}
                  login={t('login')}
                  logout={t('logout')}
                  admin={t('admin')}
                />
              </Stack>

              <Stack>{children}</Stack>
              <Footer
                locale={locale}
                menu={t('menu')}
                head1={t('head1')}
                head2={t('head2')}
                head3={t('head3')}
                contact={t('contact')}
                admin={t('admin')}
              />
            </Stack>
          </AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
