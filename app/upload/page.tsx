'use client';
import { useState, useEffect } from 'react';
import { Button, Text, Stack } from '@chakra-ui/react';
import { PiFolderSimpleUserDuotone } from 'react-icons/pi';
import { BiShapeTriangle } from 'react-icons/bi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Account';
interface ContractType {
  address: string;
  network: string;
  explore: string;
  abi: AbiItem[];
}

interface AbiItem {
  inputs: AbiInput[];
  name?: string;
  outputs?: AbiOutput[];
  stateMutability?: string;
  type: string;
  anonymous?: boolean;
}

interface AbiInput {
  internalType: string;
  name: string;
  type: string;
  indexed?: boolean;
}

interface AbiOutput {
  internalType: string;
  name: string;
  type: string;
}

const CONTRACT: ContractType = {
  address: '0x31565eAF43Cb0eEda62Ab7AaA301a246887b3994',
  network:
    'https://eth-sepolia.g.alchemy.com/v2/XLehiBbmblNGQxHugJ5wAhoBK7t2p464',
  explore: 'https://sepolia.etherscan.io/',
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_info',
          type: 'string',
        },
      ],
      name: 'add_Exporter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'hash',
          type: 'bytes32',
        },
        {
          internalType: 'string',
          name: '_ipfs',
          type: 'string',
        },
      ],
      name: 'addDocHash',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_newInfo',
          type: 'string',
        },
      ],
      name: 'alter_Exporter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: '_exporter',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: '_ipfsHash',
          type: 'string',
        },
      ],
      name: 'addHash',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_newOwner',
          type: 'address',
        },
      ],
      name: 'changeOwner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
      ],
      name: 'delete_Exporter',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_hash',
          type: 'bytes32',
        },
      ],
      name: 'deleteHash',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'count_Exporters',
      outputs: [
        {
          internalType: 'uint16',
          name: '',
          type: 'uint16',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'count_hashes',
      outputs: [
        {
          internalType: 'uint16',
          name: '',
          type: 'uint16',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '_hash',
          type: 'bytes32',
        },
      ],
      name: 'findDocHash',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_add',
          type: 'address',
        },
      ],
      name: 'getExporterInfo',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
};
const projectId = '28LuNAotbXzcvtpOcE9F8ayKOeP';
// const projectId = '5289d049085c47688271917af6cc1f4a';
//Your api secret in ifura.io
const projectSecret = '3de3d9c099c6c0c168e39b8bc03e2f7a';
declare global {
  interface Window {
    ethereum?: any;
    userAddress?: string | null;
    contract?: any;
  }
}

export default function Page() {
  const [uploadValue, setUploadValue] = useState<File | null>(null);
  const [inspect, setInspect] = useState<boolean | null>(null);

  const [hash, setHash] = useState<string>('');
  const [errorUpload, setErrorUpload] = useState<string>('');
  const { chainId, address, count, name, balance } = useAuth();
  const router = useRouter();

  const [wait, setWait] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };
  async function uploadFileToIpfs(): Promise<string> {
    const fileInput: HTMLInputElement | null = document.getElementById(
      'doc-file'
    ) as HTMLInputElement; // Explicitly cast to HTMLInputElement
    if (!fileInput) {
      throw new Error('File input element not found');
    }

    const file: File | null = fileInput.files ? fileInput.files[0] : null;
    if (!file) {
      throw new Error('No file selected');
    }

    const formData: FormData = new FormData();
    formData.append('file', file);

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
      console.log(data['Hash']); // Response data
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
        throw new Error('Please select a file.');
      }
      setWait(true);
      // const ipfsInstance: any = IPFS;
      const CID = await uploadFileToIpfs();
      const b = await uploadFileToIpfs();
      console.log('Cid', CID);
      console.log('b', b);
      console.log('window', window);
      console.log('hash', hash);
      if (hash) {
        const a = await window.contract.methods
          .addDocHash(hash, CID)
          .send({ from: window.userAddress });
        console.log('a', a);
      }
      setWait(false);
      // router.push('/confirmation');
    } catch (error: any) {
      console.error('Error uploading file22:', error);
      setErrorUpload(error.message);
      setInspect(false);
      setWait(false);
    }
  };

  return (
    <Stack bg='white' h={'100vh'} p={4} spacing={4}>
      <Stack
        bg='#2E68FF'
        borderRadius={'28px'}
        py='20px'
        pl='25px'
        textAlign={'center'}
        w='100%'
        spacing={4}
      >
        <Stack direction='row' alignItems='center'>
          <FaUniversity color='orange' size={28} />
          <Text textAlign='center' lineHeight={'27px'}>
            {name}
          </Text>
        </Stack>
        <Stack direction='row' alignItems='center'>
          <PiFolderSimpleUserDuotone color='blue' size={28} />
          <Text textAlign='center' lineHeight={'27px'}>
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
          <MdOutlineAccountBalanceWallet color='yellow' size={28} />
          <Text lineHeight={'27px'} textAlign='center'>
            {balance}
          </Text>
        </Stack>
      </Stack>
      <Stack
        bg='#2E68FF'
        borderRadius={'28px'}
        py='20px'
        pl='25px'
        textAlign={'center'}
        w='100%'
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
        {wait ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            loading . . .
          </Text>
        ) : errorUpload ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            Error Upload . . .
          </Text>
        ) : inspect ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            Document Hashed 😎
          </Text>
        ) : inspect === false ? (
          <Text textAlign='center' color='red' fontSize='lg'>
            Document Hashed error!
          </Text>
        ) : null}
      </Stack>
      <Button onClick={handleSendHash}>Upload</Button>
    </Stack>
  );
}
