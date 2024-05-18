import {
  Box,
  Container,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  Show,
} from '@chakra-ui/react';

interface InformationCardProps {
  icon: string;
  heading: string;
  text: string;
}
import { GiDiploma } from 'react-icons/gi';
import { FaSchool } from 'react-icons/fa';

const InformationCard: React.FC<InformationCardProps> = ({
  icon,
  heading,
  text,
}) => {
  return (
    <Box
      w={{ base: '100%', lg: '33.3%' }}
      borderRadius='28px'
      overflow='hidden'
      m={4}
      p={5}
      textAlign='center'
      bg='#23262f'
      minH='330px'
      fontWeight={'600'}
      boxShadow='0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
      transition='box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
      color={'white'}
      _hover={{
        boxShadow:
          'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
        transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Image src={icon} alt={heading} width={150} height={150} mx={'auto'} />
      <Heading as='h4' size='md' mt={4}>
        {heading}
      </Heading>
      <Text mt={2} color='#B7BDC6' fontSize='16px'>
        {text}
      </Text>
    </Box>
  );
};

export default function InformationSection({
  card1,
  card2,
  card3,
  card11,
  card22,
  card33,
  info,
  info1,
}: {
  card11: string;
  card22: string;
  card33: string;
  card1: string;
  card2: string;
  card3: string;
  info: string;
  info1: string;
}) {
  return (
    <Box
      as='section'
      // h='100vh'
      color='white'
      overflow={'hidden'}
      pb={'20px'}
      bg='#17181c'
    >
      <Container maxW='container.xl' mt='40px' w={{ base: '90%', lg: '80%' }}>
        <Stack
          justifyContent='center'
          alignItems='center'
          mx='auto'
          w='100%'
          direction={{ base: 'column', lg: 'row' }}
        >
          <InformationCard
            icon='./undraw_investment_data_re_sh9x.svg'
            heading={card11}
            text={card1}
          />
          <InformationCard
            icon='./undraw_time_management_re_tk5w.svg'
            heading={card22}
            text={card2}
          />
          <InformationCard
            icon='./securefiles.svg'
            heading={card33}
            text={card3}
          />
        </Stack>
        <Stack direction='row' mt='60px'>
          <Stack
            fontSize={'28px'}
            fontWeight={'700'}
            w={{ base: '100%', lg: '60%' }}
          >
            <Stack
              fontSize={'44px'}
              fontWeight={'700'}
              spacing={8}
              alignItems={'center'}
              justifyContent={'center'}
              textAlign='center'
            >
              <Text>{info}</Text>
              <Stack direction='row'>
                <Text fontSize={'54px'} h='60px'>
                  599
                </Text>
                <GiDiploma size={'90px'} />
              </Stack>
            </Stack>
            <Stack
              fontSize={'44px'}
              fontWeight={'700'}
              spacing={8}
              alignItems={'center'}
              justifyContent={'center'}
              textAlign={'center'}
            >
              <Text>{info1}</Text>
              <Stack direction='row'>
                <Text fontSize={'54px'} h='60px'>
                  17
                </Text>
                <FaSchool size={'90px'} />
              </Stack>
            </Stack>
          </Stack>
          <Show above='lg'>
            <Image src='./aAaA.png' w='50%' h='50%' alt='Diploma icon'></Image>
          </Show>
        </Stack>
      </Container>
    </Box>
  );
}
