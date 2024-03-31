import { Box, Link, Alert, AlertIcon } from '@chakra-ui/react';

const MetaMaskAlert: React.FC = () => {
  return (
    <Alert status='error' variant='subtle' className='d-none' mt={2}>
      <AlertIcon />
      Please download MetaMask at{' '}
      <Link
        href='https://metamask.io/download'
        target='_blank'
        color='blue.500'
      >
        Metamask Site
      </Link>
    </Alert>
  );
};

export default MetaMaskAlert;
