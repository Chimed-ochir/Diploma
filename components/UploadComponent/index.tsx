'use client';
import { useState, useEffect, useRef } from 'react';
import { Button, Text, Stack } from '@chakra-ui/react';
import { PiFolderSimpleUserDuotone } from 'react-icons/pi';
import { BiShapeTriangle } from 'react-icons/bi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import { useToast } from '@chakra-ui/react';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Account';
import MetaMaskAlert from '@/components/MetaMask';
import { FaGasPump } from 'react-icons/fa';
import { SiBlockchaindotcom } from 'react-icons/si';
const projectId = '28LuNAotbXzcvtpOcE9F8ayKOeP';
import { FaHashtag } from 'react-icons/fa';
import { SiIpfs } from 'react-icons/si';

// const projectId = '5289d049085c47688271917af6cc1f4a';

// const projectId = '5289d049085c47688271917af6cc1f4a';
//Your api secret in ifura.io
// const projectSecret = 'oQtcgoWwe815ozW0YhbajgvwxnwXqea6i/Jeycp2vG6yyluWIY5Xug';
const projectSecret = '3de3d9c099c6c0c168e39b8bc03e2f7a';
declare global {
  interface Window {
    ethereum?: any;
    userAddress?: string | null;
    contract?: any;
  }
}
interface ResultType {
  transactionHash: string | null;
  hashedfile: string | null;
  to: string | null;
  blockNumber: string | null;
  blockHash: string | null;
  chainID: string | null;
  gasUsed: string | null;
}
export default function UploadComponent({
  upload,
  hash1,
  hashError,
  input,
  uploadError,
  loading,
  text,
}: {
  upload: string;
  hash1: string;
  hashError: string;
  input: string;
  uploadError: string;
  loading: string;
  text: string;
}) {
  const [uploadValue, setUploadValue] = useState<File | null>(null);
  const [inspect, setInspect] = useState<boolean | null>(null);
  const toast = useToast();
  const [hash, setHash] = useState<string>('');
  const [value, setValue] = useState<ResultType | null>(null);
  const [errorUpload, setErrorUpload] = useState<string>('');
  const [cidHash, setCidHash] = useState('');
  const { chainId, address, view, meta, name, count, balance } = useAuth();
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const resetInput = () => {
    if (inputRef.current) {
      // Resetting the value by setting it to an empty string

      setErrorUpload('');
      setInspect(null);
      inputRef.current.value = '';
      setUploadValue(null); // Clear state
    }
  };
  const [wait, setWait] = useState(false);
  const truncateAddress = (address: string | null) => {
    if (!address) return;
    return `${address.substr(0, 7)}...${address.substr(
      address.length - 8,
      address.length
    )}`;
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorUpload('');
    setInspect(null);
    setWait(true);
    setValue(null);
    const file = event.target.files?.[0];
    if (file) {
      setUploadValue(file);
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
        const fileContent = evt.target?.result as string;
        const hashedContent = Web3.utils.soliditySha3(fileContent);
        console.log('hashContent', hashedContent);
        if (hashedContent) {
          setHash(hashedContent);
          setInspect(true);
        }
      };
      reader.onerror = (evt) => {
        setInspect(false);
        console.log('Error reading file:', evt);
      };
    }
    setWait(false);
  };
  async function uploadFileToIpfs(): Promise<string> {
    const fileInput: HTMLInputElement | null = document.getElementById(
      'doc-file'
    ) as HTMLInputElement; // Explicitly cast to HTMLInputElement
    if (!fileInput) {
      setErrorUpload(input);
      throw new Error('No file selected');
    }

    const file: File | null = fileInput.files ? fileInput.files[0] : null;
    if (!file) {
      setErrorUpload(input);
      throw new Error('No file selected');
    }

    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log('file------', file);
    // Replace 'projectId' and 'projectSecret' with actual values
    // const projectId: string = 'your_project_id';
    // const projectSecret: string = 'your_project_secret';

    // for authenticating your request to infura.io
    const auth: string = 'Basic ' + btoa(`${projectId}:${projectSecret}`);
    console.log('auth', auth);
    console.log('formData', formData.get('file'));
    try {
      // make post request to upload the file and get the CID
      const response: Response = await fetch(
        'https://ipfs.infura.io:5001/api/v0/add',
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: auth,
          },
        }
      );
      console.log('response', response);
      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data: any = await response.json();
      console.log('data[Hash]', data); // Response data
      // return the CID to the addDocHash to store it in the Contract
      return data['Hash'];
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  const handleSendHash = async () => {
    try {
      if (!uploadValue) {
        setErrorUpload(input);
        return;
      }
      setWait(true);
      setErrorUpload('');
      setInspect(null);
      // const ipfsInstance: any = IPFS;
      const CID = await uploadFileToIpfs();
      setCidHash(CID);
      console.log('Cid', CID);
      console.log('window', window);
      console.log('window.userAddress', window.userAddress);
      console.log('Address', address);
      console.log('hash', hash);
      if (hash) {
        const a = await window.contract.methods
          .addDocHash(hash, CID)
          .send({ from: address });
        if (a) {
          setValue(a);
          resetInput();
          toast({
            title: 'Амжилттай.',
            description: 'Амжилттай нэмлээ',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }

        console.log('a', a);
      }
      setWait(false);
      // router.push('/confirmation');
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setErrorUpload(uploadError);
      setInspect(false);
      setWait(false);
    }
  };

  return (
    <Stack h='calc(100vh - 100px)'>
      <Stack
        p={4}
        spacing={4}
        w={{ base: '98%', md: '80%' }}
        mx='auto'
        borderRadius={'28px'}
        bg='#131315'
        mt='20px'
        color='black'
        fontSize={'24px'}
        shadow={'5px'}
        border='1px solid #B7BDC6'
      >
        {meta ? <MetaMaskAlert /> : null}
        {view ? (
          <Stack
            borderRadius={'28px'}
            py='20px'
            pl='25px'
            textAlign={'center'}
            w='100%'
            color='white'
            spacing={4}
          >
            <Stack direction='row' alignItems='center'>
              <FaUniversity color='orange' size={28} />
              <Text textAlign='center' lineHeight={'27px'}>
                {name}
              </Text>
            </Stack>
            <Stack direction='row' alignItems='center'>
              <PiFolderSimpleUserDuotone
                color='blue'
                size={28}
                style={{ minWidth: '28px' }}
              />
              <Text textAlign={{ base: 'left' }} lineHeight={'27px'} w='90%'>
                {address}
              </Text>
            </Stack>
            <Stack direction='row' alignItems='center'>
              <BiShapeTriangle color='red' size={28} />
              <Text textAlign='center' lineHeight={'27px'}>
                {chainId}
              </Text>
            </Stack>
            <Stack direction='row' alignItems='center'>
              <MdOutlineAccountBalanceWallet color='green' size={28} />
              <Text lineHeight={'27px'} textAlign='center'>
                {balance}
              </Text>
            </Stack>
          </Stack>
        ) : null}
        <Stack
          borderRadius={'29px'}
          py='20px'
          pl='25px'
          textAlign={'center'}
          w='100%'
          spacing={4}
          overflow='hidden'
          bg='#23262f'
          color='#2E68FF'
          border='1px solid #B7BDC6'
        >
          <label htmlFor='file-upload' style={{ position: 'relative' }}>
            <input
              ref={inputRef}
              onChange={handleFileChange}
              id='doc-file'
              type='file'
              color='#2E68FF'
              accept='application/pdf, image/*'
            />
          </label>
        </Stack>
        {wait ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            {loading}
          </Text>
        ) : errorUpload ? (
          <Text textAlign='center' color='red' fontSize='lg'>
            {errorUpload}
          </Text>
        ) : inspect ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            {hash1}
          </Text>
        ) : inspect === false ? (
          <Text textAlign='center' color='red' fontSize='lg'>
            {hashError}
          </Text>
        ) : null}
        <Button
          onClick={handleSendHash}
          borderRadius={'28px'}
          bg='#2E68FF'
          color='white'
          w='300px'
          mx='auto'
          fontSize={'20px'}
          height={'54px'}
          isLoading={wait}
        >
          {upload}
        </Button>
      </Stack>
      {value ? (
        <Stack
          p={4}
          spacing={4}
          w={{ base: '98%', md: '80%' }}
          mx='auto'
          borderRadius={'28px'}
          bg='#131315'
          border='1px solid #B7BDC6'
          mt='20px'
          color='#B7BDC6'
          fontSize={'24px'}
          shadow={'5px'}
          mb='20px'
        >
          <Text color='white'>{text}</Text>
          <Stack
            onClick={() => {
              if (value?.transactionHash) {
                window.open(
                  `https://sepolia.etherscan.io//tx/${value.transactionHash}`,
                  '_blank' // This tells the browser to open in a new tab
                );
              }
            }}
            direction={'row'}
            style={{ cursor: 'pointer' }}
            alignItems={'center'} // Optional: Change cursor to indicate it's clickable
          >
            <BiShapeTriangle color='white' size={28} />
            <Text>{truncateAddress(value?.transactionHash)}</Text>
          </Stack>
          <Stack
            onClick={() => {
              if (cidHash) {
                window.open(
                  `https://ipfs.io/ipfs/${cidHash}`,
                  '_blank' // This tells the browser to open in a new tab
                );
              }
            }}
            direction={'row'}
            style={{ cursor: 'pointer' }}
            alignItems={'center'} // Optional: Change cursor to indicate it's clickable
          >
            <SiIpfs color='white' size={28} />
            <Text>{truncateAddress(cidHash)}</Text>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <FaHashtag color='white' size={28} />
            <Text>{truncateAddress(value?.blockHash)}</Text>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <SiBlockchaindotcom color='white' size={28} />
            <Text>{value?.blockNumber}</Text>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <BiShapeTriangle color='white' size={28} />
            <Text>{chainId}</Text>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <FaGasPump color='white' size={28} />
            <Text>{value?.gasUsed} Gwei</Text>
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <BiShapeTriangle
              color='white'
              size={28}
              style={{ minWidth: '28px' }}
            />
            <Text w='90%' textAlign={'left'}>
              {value?.to}
            </Text>
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}
