'use client';
import { Box, Button, Stack, Text } from '@chakra-ui/react';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <Stack
      h='calc(100vh - 100px)'
      fontSize={'64px'}
      // bg={'#ceeeff'}
      bgImage={'./graduate5.jpeg'}
      bgRepeat={'none'}
      bgPosition={'center'}
      bgSize={'cover'}
      w='100%'
    >
      <Stack position={'absolute'} top={'230px'} w='45%' left='60px'>
        {/* <Stack>
         
        </Stack> */}
        <Stack w='100%' textAlign={'center'}>
          <Text fontWeight='600' color='white' fontSize={'44'}>
            Блокчэйнд Баталгаажсан{' '}
          </Text>
          <Text fontWeight='600' color='white' fontSize={'64'}>
            {' '}
            Цахим Диплом
          </Text>{' '}
          {/* <Text color='white' fontSize={'24px'} w='60%'>
            {' '}
            DIPLOMA.mn платформ нь таны үйл ажиллагаанд үр ашиг, аюулгүй байдлыг
            бий болгох зорилготой платформ юм.
          </Text>{' '} */}
        </Stack>
        <Button
          color='white'
          bg='#2E68FF'
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
  );
}
