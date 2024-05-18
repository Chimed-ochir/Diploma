import { Box, Button, Stack, Text, Image, Show } from '@chakra-ui/react';
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
      gap='0'
    >
      <Stack
        w='100%'
        bg='#23262f'
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Stack
          h='calc(100vh - 300px)'
          fontSize={'64px'}
          w={{ base: '80%', lg: '90%', xl: '80%' }}
          alignItems={'start'}
          direction={{ base: 'column', lg: 'row' }}
          pt='50px'
          // style={{
          //   backgroundImage: 'url(/agame.jpeg)', // Corrected
          //   backgroundSize: 'cover', // Optional: Adjust as needed
          //   backgroundPosition: 'center', // Optional: Adjust as needed
          // }}
        >
          <Stack w={{ base: '100%', lg: '50%' }} mt='50px'>
            <Stack w='100%' textAlign={'center'}>
              <Text
                fontWeight='600'
                color='#3874FF'
                fontSize={{ base: '30', sm: '40' }}
              >
                {t('diploma1')}
              </Text>
              <Text
                fontWeight='600'
                color='white'
                fontSize={{ base: '40', sm: '58' }}
              >
                {' '}
                {t('diploma')}
              </Text>{' '}
            </Stack>
            <Link href={`/${locale}/verify`}>
              <Stack>
                <Button
                  color='white'
                  bg='#3874FF'
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
          <Show above='lg'>
            <Stack
              w={'50%'}
              direction='row'
              overflow={'hidden'}
              alignItems={'center'}
              justifyContent={{ base: 'center' }}
            >
              <Image src='./HM.png' alt='about' width={300} height={300} />
              <Image
                src='./good.png'
                alt='about'
                width={150}
                height={200}
                alignSelf={'end'}
                justifySelf={'start'}
                mb='15px'
              />
            </Stack>
          </Show>
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
