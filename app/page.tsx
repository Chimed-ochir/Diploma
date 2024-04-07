'use client';
import { Box, Button, Stack, Text, Image } from '@chakra-ui/react';
import InformationSection from '@/components/information';
import { useRouter } from 'next/navigation';
import AboutSection from '@/components/About';

export default function Home() {
  const router = useRouter();
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
          backgroundImage: 'url(./agame.jpeg)', // Corrected
          backgroundSize: 'cover', // Optional: Adjust as needed
          backgroundPosition: 'center', // Optional: Adjust as needed
        }}
      >
        <Stack w='50%' mt='-400px'>
          <Stack w='100%' textAlign={'center'}>
            <Text fontWeight='600' color='#a915cb' fontSize={'44'}>
              Блокчэйнд Баталгаажсан{' '}
            </Text>
            <Text fontWeight='600' color='white' fontSize={'64'}>
              {' '}
              Цахим Диплом
            </Text>{' '}
          </Stack>
          <Button
            color='white'
            bg='#a915cb'
            height={'54px'}
            w='200px'
            mx='auto'
            mt='30px'
            onClick={() => router.push('/verify')}
          >
            Шалгах
          </Button>
        </Stack>
      </Stack>
      <InformationSection />
      {/* <AboutSection /> */}
    </Stack>
  );
}
