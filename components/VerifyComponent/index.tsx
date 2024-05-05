'use client';
import { Button, Stack, Text } from '@chakra-ui/react';
import { BsBookmarkCheckFill } from 'react-icons/bs';
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
}: {
  title: string;
  verifyText: string;
  success: string;
  error: string;
}) {
  const { address } = useAuth();
  const [verifyValue, setVerifyValue] = useState<string | null>(null);
  const [inspect, setInspect] = useState<boolean | null>(null);
  const [valueError, setValueError] = useState('');
  const [school, setSchool] = useState<number | string>('n/a');
  const [block, setBlock] = useState<number | string>('n/a');
  const [time, setTime] = useState<Date | string>(new Date()); // Set initial state to the current date
  console.log('title', title);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
        const fileContent = evt.target?.result as string;
        const hashedContent = Web3.utils.soliditySha3(fileContent);
        if (hashedContent) {
          setVerifyValue(hashedContent);
        }
      };
      reader.onerror = (evt) => {
        console.error('Error reading file:', evt);
      };
    }
  };
  console.log('school', school);
  const verifyHash = async () => {
    if (verifyValue) {
      setValueError('Түр хүлээнэ үү...');
      await window.contract.methods
        .findDocHash(verifyValue)
        .call({ from: window.localStorage.getItem('userAddress') })
        .then((result: [string, string, string, string]) => {
          if (result[0] !== '0' && result[1] !== '0') {
            setValueError('Амжилттай...');
            console.log('result', result);
            print_verification_info(result, true);
          } else {
            console.log('result', result);
            print_verification_info(result, false);
          }
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
      console.log('t', t);
      setTime(t);
      console.log('t.toString()', t);
      setBlock(result[0]);
    } else if (is_verified === false) {
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
    <Stack w='80%' mx='auto' mt='20px' h='calc(100vh - 100px)'>
      <Stack
        textColor='black'
        borderRadius={'28px'}
        minHeight={'300px'}
        bg='#7126a2'
        justifyContent={'space-evenly'}
        alignItems={'center'}
        py='20px'
        fontSize={'24px'}
      >
        <Text color={'white'}>{verifyText}</Text>
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
        >
          <label htmlFor='file-upload' style={{ position: 'relative' }}>
            <input
              onChange={handleFileChange}
              id='doc-file'
              type='file'
              accept='application/pdf, image/*'
            />
          </label>
        </Stack>
        <Button
          onClick={verifyHash}
          borderRadius={'28px'}
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
            w='60%'
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
