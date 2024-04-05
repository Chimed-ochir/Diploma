import {
  Box,
  Container,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
} from '@chakra-ui/react';

interface InformationCardProps {
  icon: string;
  heading: string;
  text: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
  icon,
  heading,
  text,
}) => {
  return (
    <Box
      w={'33.3%'}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      m={4}
      p={5}
      textAlign='center'
      // bg='gray.700'
      bg='white'
      boxShadow='xl'
    >
      <Image src={icon} alt={heading} width={150} height={150} mx={'auto'} />
      <Heading as='h4' size='md' mt={4}>
        {heading}
      </Heading>
      <Text mt={2} fontSize='lg'>
        {text}
      </Text>
    </Box>
  );
};

const InformationSection: React.FC = () => {
  return (
    <Box as='section'>
      <Container maxW='container.xl'>
        <Stack justifyContent='center' direction='row'>
          <InformationCard
            icon='./undraw_investment_data_re_sh9x.svg'
            heading='Бага зардал'
            text='Бага зардал'
          />
          <InformationCard
            icon='./undraw_time_management_re_tk5w.svg'
            heading='Хурдан ажиллагаа'
            text='Гэрчилгээг баталгаажуулахад ердөө 1 секунд зарцуулагдана.'
          />
          <InformationCard
            icon='./securefiles.svg'
            heading='Найдвартай'
            text='Блокчейн технологиор 100% аюулгүй, ил тод үйл ажиллагаа явуулна.'
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default InformationSection;
