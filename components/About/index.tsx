import {
  Box,
  Container,
  Image,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
} from '@chakra-ui/react';

const AboutSection: React.FC = () => {
  return (
    <Box
      as='section'
      id='about'
      className='about d-flex align-items-center text-light py-5'
    >
      <Stack alignItems='center' w='90%' mx='auto' direction='row'>
        <Box color='white'>
          <Text className='main-header-section'>Бидний тухай</Text>
          <Heading as='h1' size='xl' mt={4} mb={2}></Heading>
          <Text className='py-2 para-light'>
            Бид Блокчэйн технологийн хэрэглээ, давуу талыг олон нийтэд таниулах
            ажлын хүрээнд блокчэйнийг боловсролын салбарт нэвтрүүлж баримт
            бичгийг блокчэйнд аюулгүй, найдвартай баталгаажуулах систем болон
            дэд бүтцийн боломжийг бүрдүүллээ.
          </Text>
          <Text className='py-2 para-light'>
            Дипломыг блокчэйн дээр баталгаажуулснаар Баталгаат: Диплом,
            сертификат, гэрчилгээ зэргийг блокчэйн технологи ашиглан дахин
            өөрчлөгдөх боломжгүйгээр баталгаажуулж залилангийн эрсдэлийг
            бууруулах; Хямд: Нэмэлт зардлаар технологийн хөгжүүлэлт хийх
            шаардлагагүй, хамгийн хямд өртгөөр блокчэйн сүлжээгээр
            баталгаажуулах бөгөөд дипломыг жинхэнэ эсэхийг үнэгүй шалгах
            боломжтой; Байгальд ээлтэй: Хувийн хэрэг цаас архивлан хадгалах
            шаардлагагүй; Олон боломж: Өөрийн үйл ажиллагаанд инновац шингээж,
            байгууллагын нэр хүндийг өсгөх, хамгаалах зэрэг боломжууд бий болох
            юм. Төрөөс баталгаажсан: Боловсрол шинжлэх ухааны сайд болон Хууль
            зүй, дотоод хэргийн сайдын хамтарсан албан даалгаврын хүрээнд
            Боловсролын ерөнхий газраас цахим дипломыг блокчэйнд
            баталгаажуулдаг.
          </Text>

          <Box my={3}>
            <Button colorScheme='whiteAlpha'>Learn More</Button>
          </Box>
        </Box>

        <Image
          src='./gradutae2.jpeg'
          alt='about'
          width={500}
          height={500}
          borderRadius={'50%'}
        />
      </Stack>
    </Box>
  );
};

export default AboutSection;
