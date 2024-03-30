'use client';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { PiFolderSimpleUserDuotone } from 'react-icons/pi';
import { BiShapeTriangle } from 'react-icons/bi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { useAuth } from '@/context/Account';
import { useState } from 'react';

export default function Page() {
  const { chainId, address, count, view, explorer, balance } = useAuth();
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
        setError('Экспортлогчийг блокчэйнд нэмсэн');
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
          bg='#2E68FF'
          borderRadius={'28px'}
          py='20px'
          pl='25px'
          textAlign={'center'}
          w='100%'
        >
          <Stack direction='row'>
            <PiFolderSimpleUserDuotone color='blue' size={28} />

            <Text>{address}</Text>
          </Stack>
          <Stack direction='row'>
            <BiShapeTriangle color='red' size={28} />

            <Text>{chainId}</Text>
          </Stack>
          <Stack direction='row'>
            <MdOutlineAccountBalanceWallet color='yellow' size={28} />

            <Text>{balance}</Text>
          </Stack>
          <Stack direction='row'>
            <FaUniversity color='orange' size={28} />
            <Text>{count}</Text>
          </Stack>
          <Stack direction='row'>
            <IoIosDocument color='yellow' size={28} />

            <Text>{explorer}</Text>
          </Stack>
        </Stack>
      ) : null}
      <Stack
        bg='#2E68FF'
        borderRadius={'28px'}
        py='20px'
        pl='25px'
        textAlign={'center'}
        // height={'250px'}
        w='640px'
        justifyContent={'space-between'}
        alignItems='center'
        minHeight={'300px'}
      >
        <Stack
          w='90%'
          justifyContent={'space-between'}
          color='black'
          minHeight={'150px'}
        >
          <Input
            h='54px'
            bg='#FFFFFF'
            borderRadius={'17px'}
            placeholder='Сургуулийн хаяг'
            pl='10px'
            onChange={(e: any) => setMetaAddress(e.target.value)}
          ></Input>
          <Input
            h='54px'
            bg='#FFFFFF'
            borderRadius={'17px'}
            placeholder='Сургуулийн нэр'
            pl='10px'
            onChange={(e: any) => setInfo(e.target.value)}
          ></Input>

          {error ? (
            <Text lineHeight={'27px'} textAlign='center'>
              {error}
            </Text>
          ) : null}
        </Stack>
        <Stack direction='row' w='80%' justifyContent={'space-between'}>
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
            Сургууль Нэмэх
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
            Сургууль устгах
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
            Өөрчлөх
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
