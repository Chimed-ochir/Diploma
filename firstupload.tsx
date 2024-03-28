'use client';
import { useState, useEffect } from 'react';
import { Button, Input, Stack, Box, Text, Textarea } from '@chakra-ui/react';
import { PiFolderSimpleUserDuotone } from 'react-icons/pi';
import { BiShapeTriangle } from 'react-icons/bi';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { FaUniversity } from 'react-icons/fa';
import { IoIosDocument } from 'react-icons/io';
import Web3 from 'web3';
import { useRouter } from 'next/navigation';
import { Options, create } from 'ipfs-http-client';
// import IpfsModule from '../../public/js/ipfs.js';
import IPFS from 'ipfs';

// Rest of your code
declare global {
  interface Window {
    Ipfs: any; // Define the Ipfs property on the window object
  }
}
export default function Page() {
  const [uploadValue, setUploadValue] = useState<File | null>(null);
  const [hashedFile, setHashedFile] = useState<string | null>('');
  const [chainId, setChainId] = useState('');
  const [inspect, setInspect] = useState<boolean>(false);
  const [ipfsInstance, setIpfsInstance] = useState<any>(null);
  interface CustomWindow extends Window {
    ethereum?: any;
    userAddress?: string | null;
    contract?: any;
    web3?: any; // Declare the web3 property
  }
  async function get_ChainID() {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        throw new Error('Ethereum provider not found.');
      }

      const chainId = await ethereum.request({
        method: 'eth_chainId',
      });

      switch (chainId) {
        case '0x1':
          setChainId('Ethereum Main Network (Mainnet)');
          break;
        case '0x80001':
          setChainId('Polygon Test Network');
          break;
        case '0x89':
          setChainId('Polygon Mainnet');
          break;
        case '0x3':
          setChainId('Ropsten Test Network');
          break;
        case '0x4':
          setChainId('Rinkeby Test Network');
          break;
        case '0x5':
          setChainId('Goerli Test Network');
          break;
        case '0x2a':
          setChainId('Kovan Test Network');
          break;
        default:
          setChainId('Unknown ChainID');
      }
    } catch (error) {
      console.error('Error getting chain ID:', error);
      setChainId('Unknown ChainID');
    }
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('file', file);
    if (file) {
      setUploadValue(file);
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (evt) => {
        const fileContent = evt.target?.result as string;
        const web3 = new Web3();
        const hashedContent = web3.utils.soliditySha3(fileContent);
        if (hashedContent) {
          setHashedFile(hashedContent);
          setInspect(true);
        } else {
          setHashedFile(null);
        }
      };
      reader.onerror = (evt) => {
        console.log('Error reading file:', evt);
      };
    } else {
      setHashedFile(null);
    }
  };
  interface IpfsAddResponse {
    path: string;
  }

  interface IpfsCreateOptions {
    repo?: string;
    // Add more options here if needed
  }

  interface Ipfs {
    add: (file: File) => Promise<IpfsAddResponse>;
    create: (options?: IpfsCreateOptions) => Promise<any>;
  }

  // Cast Ipfs to the defined interface
  // const ipfs: Ipfs = IpfsModule as unknown as Ipfs;

  const customWindow: CustomWindow =
    typeof window !== 'undefined' ? window : ({} as CustomWindow);
  useEffect(() => {
    const loadIpfsScript = async () => {
      try {
        // Load the ipfs.js script dynamically
        const script = document.createElement('script');
        script.src = '/js/ipfs.js';
        script.async = true;
        script.onload = () => {
          // Initialize ipfs object once the script is loaded
          // const Ipfs = window.Ipfs; // Assuming ipfs.js exports Ipfs object globally
          const options: IpfsCreateOptions = { repo: 'Ali-ok' + Math.random() };
          // const ipfsInstance = ipfs.create(options);
          // const ipfsInstance = ipfs.create({ repo: 'Ali-ok' + Math.random() }); // Initialize ipfs instance
          // console.log('ipfsInstance', ipfsInstance);
          setIpfsInstance(ipfsInstance); // Save ipfs instance to state
        };
        document.body.appendChild(script);
        console.log('loadscript work');
      } catch (error) {
        console.error('Error loading IPFS script:', error);
      }
    };

    loadIpfsScript();

    return () => {
      // Clean up: remove the dynamically loaded script from the DOM
      const script = document.querySelector('script[src="/js/ipfs.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const router = useRouter();
  useEffect(() => {
    // Your IPFS logic here
    const initializeIPFS = async () => {
      // Your IPFS logic here
      const node = await IPFS.create();
      console.log('IPFS node created:', node);
    };

    initializeIPFS();
  }, []);
  // console.log('ipfs---', ipfs);
  const handleSendHash = async () => {
    try {
      // Ensure ipfs object is initialized
      if (!ipfsInstance) {
        throw new Error('IPFS object is not initialized.');
      }

      await get_ChainID();
      if (!uploadValue) {
        throw new Error('Please select a file.');
      }
      console.log('ipfsInstance', ipfsInstance);
      if (typeof ipfsInstance.add !== 'function') {
        throw new Error('ipfs.add is not a function.');
      }

      // Add the file to IPFS using ipfsInstance

      const result = await ipfsInstance.add(uploadValue); // Use ipfsInstance here
      console.log('result', result);
      const ipfsCid = result.path;

      // Call the contract method to add document hash
      await customWindow.contract.methods
        .addDocHash(uploadValue.name, ipfsCid)
        .send({ from: customWindow.userAddress });

      // Redirect to confirmation page
      router.push('/confirmation');
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error
    }
  };

  return (
    <Stack bg='white' h={'100vh'}>
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
          <Text textAlign='center' lineHeight={'27px'}>
            0xc48b5c6bfad52b536c523ad5fe2484dfd4fbde2b
          </Text>
        </Stack>

        <Stack direction='row'>
          <BiShapeTriangle color='red' size={28} />

          <Text textAlign='center' lineHeight={'27px'}>
            {chainId}
          </Text>
        </Stack>
        <Stack direction='row'>
          <MdOutlineAccountBalanceWallet color='yellow' size={28} />

          <Text lineHeight={'27px'} textAlign='center'>
            0.6695
          </Text>
        </Stack>
        <Stack direction='row'>
          <FaUniversity color='orange' size={28} />
          <Text textAlign='center' lineHeight={'27px'}>
            5
          </Text>
        </Stack>
        <Stack direction='row'>
          <IoIosDocument color='yellow' size={28} />

          <Text textAlign='center' lineHeight={'27px'}>
            1
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
      >
        <label htmlFor='file-upload' style={{ position: 'relative' }}>
          <input
            id='file-upload'
            type='file'
            accept='image/*'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: '37px',
              opacity: 0,
            }}
            onChange={handleFileChange}
            aria-hidden='true'
          />
          Upload Picture
        </label>
        {inspect ? (
          <Text textAlign='center' color='white' fontSize='lg'>
            Document Hashed 😎
          </Text>
        ) : null}
      </Stack>

      <Button
        onClick={() => {
          handleSendHash();
        }}
      >
        Upload
      </Button>
    </Stack>
  );
}
