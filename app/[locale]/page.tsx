import { Box, Button, Stack, Text, Image } from '@chakra-ui/react';
import InformationSection from '@/components/information';
// import { useRouter } from 'next/navigation';
import AboutSection from '@/components/About';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // const router = useRouter();
  const t = useTranslations('Home');
  console.log('locale', locale);
  return (
    <Stack
    // bg='white'
    // bg='#ebebeb'
    >
      <Stack
        h='calc(100vh - 100px)'
        fontSize={'64px'}
        w='100%'
        alignItems={'center'}
        direction={'row'}
        style={{
          backgroundImage: 'url(/agame.jpeg)', // Corrected
          backgroundSize: 'cover', // Optional: Adjust as needed
          backgroundPosition: 'center', // Optional: Adjust as needed
        }}
      >
        <Stack w={{ base: '100%', lg: '50%' }} mt='-200px'>
          <Stack w='100%' textAlign={'center'}>
            <Text fontWeight='600' color='#a915cb' fontSize={'44'}>
              {t('diploma1')}
            </Text>
            <Text fontWeight='600' color='white' fontSize={'64'}>
              {' '}
              {t('diploma')}
            </Text>{' '}
          </Stack>
          <Link href={`/${locale}/verify`}>
            <Stack>
              <Button
                color='white'
                bg='#a915cb'
                height={'54px'}
                w='200px'
                mx='auto'
                mt='30px'
                // onClick={() => router.push('/verify')}
              >
                {t('button')}
              </Button>
            </Stack>
          </Link>
        </Stack>
      </Stack>
      <InformationSection
        card1={t('card1')}
        card2={t('card2')}
        card3={t('card3')}
        card11={t('card11')}
        card22={t('card22')}
        card33={t('card33')}
        info={t('info')}
        info1={t('info1')}
      />
      {/* <AboutSection /> */}
    </Stack>
  );
}
