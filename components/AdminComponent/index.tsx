'use client';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { PiFolderSimpleUserDuotone } from 'react-icons/pi';
import { BiShapeTriangle } from 'react-icons/bi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { useAuth } from '@/context/Account';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function AdminComponent({
  admin1,
  admin2,
  admin3,
  admin4,
  admin5,
}: {
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  admin5: string;
}) {
  const { chainId, address, count, view, explorer, balance, setLoad, load } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [metaAddress, setMetaAddress] = useState('');

  const addExporter = async () => {
    console.log('run add', info, metaAddress);
    if (info && metaAddress) {
      setLoading(true);
      setError('Гүйлгээ хийгдтэл хүлээнэ үү 😴 ...');
      try {
        const add = await window.contract.methods
          .add_Exporter(metaAddress, info)
          .send({ from: window.localStorage.getItem('userAddress') });
        setLoad(!load);
        setError('Админыг блокчэйнд нэмсэн');
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError('Нэмэхийн тулд та хаяг, мэдээллийг оруулах шаардлагатай');
      setLoading(false);
    }
  };
  const deleteExporter = async () => {
    if (metaAddress) {
      setLoading2(true);
      setError('Гүйлгээ хийгдтэл хүлээнэ үү 😴 ...');
      // get_ChainID();
      try {
        await window.contract.methods
          .delete_Exporter(metaAddress)
          .send({ from: window.localStorage.getItem('userAddress') });
        setLoading2(false);
        setError('Амжилттай устгалаа.');
      } catch (error) {
        setError('Хаяг устгахад алдаа гарлаа.');
        setLoading2(false);
      }
    } else {
      setError('Устгахын тулд хаяг оруулах шаардлагатай!👍');
      setLoading2(false);
    }
  };
  const editExporter = async () => {
    if (info && metaAddress) {
      setLoading3(true);
      setError('Гүйлгээ хийгдтэл хүлээнэ үү 😴 ...');
      // get_ChainID();

      try {
        await window.contract.methods
          .alter_Exporter(address, info)
          .send({ from: window.localStorage.getItem('userAddress') });
        setError('Экспортлогч амжилттай шинэчлэгдлээ 😊');
        setLoading3(false);
      } catch (error) {
        setError('Өөрчлөхөд алдаа гарлаа');
        setLoading3(false);
      }
    } else {
      setError('Өөрчлөхийн тулд хаяг оруулах шаардлагатай!👍');
      setLoading3(false);
    }
  };
  const truncateAddress = (address: string | null) => {
    if (!address) return;
    return `${address.substr(0, 7)}...${address.substr(
      address.length - 8,
      address.length
    )}`;
  };
  useEffect(() => {
    console.log(
      'typeof window-----',
      typeof window,
      window.localStorage.getItem('userAddress')
    );
    if (
      typeof window != 'undefined' &&
      window.localStorage.getItem('userAddress') !==
        '0x896715dc4eaf034785b3b5a1f7078478ac24e77f'
    ) {
      redirect('/mn');
    }
  }, [address]);
  return (
    <Stack
      h='calc(100vh - 100px)'
      color='white'
      alignItems='center'
      gap='1rem'
      w='80%'
      mx='auto'
      mt='20px'
    >
      {view ? (
        <Stack
          bg='#131315'
          border='1px solid #B7BDC6'
          borderRadius={'28px'}
          py='20px'
          pl={{ lg: '25px' }}
          textAlign={'center'}
          w='100%'
        >
          <Stack
            direction='row'
            overflow={'hidden'}
            w={{ base: ' 90%', lg: '100%' }}
            mx={'auto'}
          >
            <PiFolderSimpleUserDuotone color='blue' size={28} />

            <Text>{truncateAddress(address)}</Text>
          </Stack>
          <Stack direction='row' w={{ base: ' 90%', lg: '100%' }} mx={'auto'}>
            <BiShapeTriangle color='red' size={28} />

            <Text>{chainId}</Text>
          </Stack>
          <Stack direction='row' w={{ base: ' 90%', lg: '100%' }} mx={'auto'}>
            <MdOutlineAccountBalanceWallet color='yellow' size={28} />

            <Text>{balance}</Text>
          </Stack>
          <Stack direction='row' w={{ base: ' 90%', lg: '100%' }} mx={'auto'}>
            <FaUniversity color='orange' size={28} />
            <Text>{count}</Text>
          </Stack>
          <Stack direction='row' w={{ base: ' 90%', lg: '100%' }} mx={'auto'}>
            <IoIosDocument color='yellow' size={28} />

            <Text>{explorer}</Text>
          </Stack>
        </Stack>
      ) : null}
      <Stack
        bg='#131315'
        border='1px solid #B7BDC6'
        borderRadius={'28px'}
        py='20px'
        pl={{ lg: '25px' }}
        textAlign={'center'}
        // height={'250px'}
        w={{ base: '100%', lg: '640px' }}
        justifyContent={'space-between'}
        alignItems='center'
        minHeight={'300px'}
      >
        <Stack
          w='90%'
          justifyContent={'space-between'}
          color='white'
          minHeight={'150px'}
        >
          <Input
            h='54px'
            bg='#23262f'
            borderRadius={'17px'}
            placeholder={admin1}
            pl='10px'
            onChange={(e: any) => setMetaAddress(e.target.value)}
          ></Input>
          <Input
            h='54px'
            bg='#23262f'
            borderRadius={'17px'}
            placeholder={admin2}
            pl='10px'
            onChange={(e: any) => setInfo(e.target.value)}
          ></Input>

          {error ? (
            <Text lineHeight={'27px'} textAlign='center'>
              {error}
            </Text>
          ) : null}
        </Stack>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          w='80%'
          justifyContent={'space-between'}
          mt={{ base: '10px', lg: '' }}
        >
          <Button
            colorScheme='yellow'
            h='54px'
            bg='green'
            borderRadius={'17px'}
            px='8px'
            onClick={addExporter}
            isLoading={loading}
          >
            {' '}
            {admin3}
          </Button>
          <Button
            colorScheme='yellow'
            h='54px'
            bg='red'
            borderRadius={'17px'}
            px='5px'
            onClick={deleteExporter}
            isLoading={loading2}
          >
            {' '}
            {admin4}
          </Button>
          <Button
            colorScheme='yellow'
            h='54px'
            bg='yellow'
            borderRadius={'17px'}
            px='5px'
            isLoading={loading3}
            onClick={editExporter}
          >
            {admin5}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
