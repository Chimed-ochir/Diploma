import { Text, Link, Alert, AlertIcon } from '@chakra-ui/react';
const MetaMaskAlert: React.FC<{ text1: string; text2: string }> = ({
  text1,
  text2,
}: {
  text1: string;
  text2: string;
}) => {
  return (
    <Alert
      status='error'
      variant='subtle'
      className='d-none'
      mt={2}
      w='90%'
      fontSize={'16px'}
    >
      <AlertIcon />
      {text1}
      <Link
        href='https://metamask.io/download'
        target='_blank'
        color='blue.500'
      >
        <Text>
          {'\u00A0'} {text2}
        </Text>
      </Link>
    </Alert>
  );
};

export default MetaMaskAlert;
