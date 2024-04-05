'use client';
import { Box, Button, Stack, Text, Image } from '@chakra-ui/react';
import InformationSection from '@/components/information';
import { useRouter } from 'next/navigation';
import AboutSection from '@/components/About';

export default function Home() {
  const router = useRouter();
  return (
    <Stack
      bg='white'
      // bg='#ebebeb'
      // style={{
      //   background: `radial-gradient(circle, rgba(15,80,138,1) 19%, rgba(10,72,129,1) 38%, rgba(1,5,30,1) 100%)`,
      //   // backgroundImage: './aa.png',
      // }}
    >
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
      <Stack
        h='calc(100vh - 100px)'
        fontSize={'64px'}
        w='100%'
        alignItems={'center'}
        direction={'row'}
        // position='absolute'
      >
        <Stack w='50%'>
          <Image
            src='./ABAA.png'
            alt='graduate'
            width={'100%'}
            // borderRadius={'50%'}
          />
        </Stack>
        <Stack
          w='40%'
          mt='-50px'
          position={'absolute'}
          left='300px'
          top='290px'
        >
          {/* <Stack>
         
        </Stack> */}

          <Stack w='100%' textAlign={'center'} alignItems={'center'}>
            <Image
              src='./ablock.png'
              alt='graduate'
              w='300px'
              height={'90%'}
              // borderRadius={'50%'}
            />
          </Stack>
        </Stack>
        <Stack w='50%' mt='-100px'>
          {/* <Stack>
         
        </Stack> */}
          <Stack w='100%' textAlign={'center'}>
            <Text fontWeight='600' color='black' fontSize={'44'}>
              Блокчэйнд Баталгаажсан{' '}
            </Text>
            <Text fontWeight='600' color='black' fontSize={'64'}>
              {' '}
              Цахим Диплом
            </Text>{' '}
            {/* <Text color='black' fontSize={'24px'} w='60%'>
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
      <InformationSection />
      <AboutSection />
    </Stack>
  );
}
