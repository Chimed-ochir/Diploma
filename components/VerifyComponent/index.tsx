'use client';
import { Button, Stack, Text } from '@chakra-ui/react';
import { BsBookmarkCheckFill, BsFillNutFill } from 'react-icons/bs';
import Web3 from 'web3';
import { useAuth } from '@/context/Account';
import { useState } from 'react';
import { IoTime } from 'react-icons/io5';
import { FaCube, FaUniversity } from 'react-icons/fa';

export default function VerifyComponent({
  title,
  verifyText,
  success,
  error,
  hash1,
  hashError,
  loading,
  verify,
}: {
  title: string;
  verifyText: string;
  success: string;
  error: string;
  hash1: string;
  hashError: string;
  loading: string;
  verify: string;
}) {
  const { address } = useAuth();
  const [verifyValue, setVerifyValue] = useState<string | null>(null);
  const [inspect, setInspect] = useState<boolean | null>(null);
  const [inspectHash, setInspectHash] = useState<boolean | null>(null);
  const [valueError, setValueError] = useState('');
  const [school, setSchool] = useState<number | string>('n/a');
  const [block, setBlock] = useState<number | string>('n/a');
  const [wait, setWait] = useState(false);
  const [time, setTime] = useState<Date | string>(new Date()); // Set initial state to the current date
  console.log('title', title);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInspect(null);
    setValueError('');
    setInspectHash(null);
    setWait(true);
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
        const fileContent = evt.target?.result as string;
        const hashedContent = Web3.utils.soliditySha3(fileContent);
        if (hashedContent) {
          setVerifyValue(hashedContent);
          setInspectHash(true);
        }
      };
      reader.onerror = (evt) => {
        setInspectHash(false);
        console.error('Error reading file:', evt);
      };
    }
    setWait(false);
  };
  console.log('school', school);
  const verifyHash = async () => {
    if (verifyValue) {
      setWait(true);
      setInspectHash(null);
      setValueError('');
      await window.contract.methods
        .findDocHash(verifyValue)
        .call({ from: window.localStorage.getItem('userAddress') })
        .then((result: [string, string, string, string]) => {
          if (result[0] !== '0' && result[1] !== '0') {
            setWait(false);

            console.log('result', result);
            print_verification_info(result, true);
          } else {
            console.log('result', result);
            print_verification_info(result, false);
            setWait(false);
          }
        })
        .catch((err: any) => {
          setValueError(verify);
          setWait(false);
        });
    }
  };

  const print_verification_info = (
    result: [string, string, string, string],
    is_verified: boolean
  ) => {
    if (is_verified) {
      console.log('result[1]', result[1]);
      console.log('result[2]', result[2]);
      console.log('result[3]', result[3]);

      setInspect(true);
      setSchool(result[2]);
      const t = new Date();

      t.setSeconds(parseInt(result[0]));
      t.setHours(t.getHours() + 3);
      setTime(t);
      setBlock(result[0]);
    } else if (is_verified === false) {
      // setValueError(verify);
      setInspect(false);
    }
  };

  const truncateAddress = (address: string) => {
    if (!address) return;
    return `${address.substr(0, 7)}...${address.substr(
      address.length - 8,
      address.length
    )}`;
  };

  return (
    <Stack w={{ base: '98%', md: '80%' }} mx='auto' mt='20px' mb='40px'>
      <Stack
        textColor='black'
        borderRadius={'28px'}
        minHeight={'300px'}
        bg='#7126a2'
        justifyContent={'space-evenly'}
        alignItems={'center'}
        py='20px'
        fontSize={'24px'}
        mt={{ base: '20px', md: '' }}
      >
        <Text color={'white'} w='90%'>
          {verifyText}
        </Text>
        <Stack
          borderRadius={'28px'}
          py='20px'
          pl='25px'
          textAlign={'center'}
          // bg='#2E68FF'
          bg='white'
          color='#2E68FF'
          border='1px solid #BCADFF'
          w='90%'
          spacing={4}
          overflow={'hidden'}
        >
          <label
            htmlFor='file-upload'
            style={{ position: 'relative', maxWidth: '300px' }}
          >
            <input
              onChange={handleFileChange}
              id='doc-file'
              type='file'
              accept='application/pdf, image/*'
            />
          </label>
        </Stack>
        {wait ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            {loading}
          </Text>
        ) : valueError ? (
          <Text textAlign='center' color='red' fontSize='lg'>
            {valueError}
          </Text>
        ) : inspectHash ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            {hash1}
          </Text>
        ) : inspectHash === false ? (
          <Text textAlign='center' color='red' fontSize='lg'>
            {hashError}
          </Text>
        ) : null}
        <Button
          onClick={verifyHash}
          borderRadius={'28px'}
          isLoading={wait}
          bg='#2E68FF'
          color='white'
          w='300px'
          mx='auto'
          fontSize={'24px'}
          height={'54px'}
        >
          {title}
        </Button>

        {inspect !== null && (
          <Stack
            color='black'
            fontSize='24px'
            bg='white'
            w={{ base: '90%', lg: '60%' }}
            borderRadius={'28px'}
            pl='20px'
            py='10px'
            border='1px solid #BCADFF'
          >
            <Text color={inspect ? 'green' : 'red'}>
              {inspect ? success : error}
            </Text>
            <Stack direction={'row'} alignItems={'center'}>
              <BsBookmarkCheckFill />
              <Text>{truncateAddress(verifyValue || '')}</Text>
            </Stack>
            {inspect && (
              <>
                <Stack direction={'row'} alignItems={'center'}>
                  <FaUniversity />
                  <Text>{school}</Text>
                </Stack>
                <Stack direction={'row'} alignItems={'center'}>
                  <IoTime />
                  <Text>
                    {typeof time === 'string' ? time : time.toString()}
                  </Text>
                </Stack>

                <Stack direction={'row'} alignItems={'center'}>
                  <FaCube />
                  <Text> {block}</Text>
                </Stack>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
