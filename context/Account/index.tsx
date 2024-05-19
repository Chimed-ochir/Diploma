'use client';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { redirect, usePathname, useRouter } from 'next/navigation';
import { useToast } from '@chakra-ui/react';
import Web3 from 'web3';

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

interface AuthProviderValueType {
  disconnect: () => void;
  connect: () => void;
  fullPath: (query?: { [key: string]: any }, locale?: string) => string;
  address: string | null;
  count: number | null;
  explorer: number | null;
  balance: string;
  name: string;
  chainId: string;
  view: boolean;
  meta: boolean;
  load: boolean;
  setLoad: Dispatch<SetStateAction<boolean>>;
}

function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const AuthContext = createContext({} as AuthProviderValueType);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  const toast = useToast();

  const [address, setAddress] = useState<string | null>('n/a');
  const [explorer, setExplorer] = useState<number | null>(0);
  const [expor, setExpor] = useState<number | null>(0);
  const [count, setCount] = useState<number | null>(0);
  const [chainId, setChainId] = useState('Unknown ChainID');
  const [balance, setBalance] = useState('n/a');
  const [name, setName] = useState('n/a');
  const [view, setView] = useState(false);
  const [meta, setMeta] = useState(false);
  const [load, setLoad] = useState(false);

  interface CustomWindow extends Window {
    ethereum?: any;
    userAddress?: string | null;
    contract?: any;
    web3?: any; // Declare the web3 property
  }
  const customWindow: CustomWindow =
    typeof window !== 'undefined' ? window : ({} as CustomWindow);

  let isConnecting = false;
  console.log('-098', load);
  const connect = async () => {
    if (isConnecting) return; // Prevent re-execution if already in progress
    isConnecting = true;

    console.log('Connecting');
    try {
      const accounts = await customWindow.ethereum.request({
        method: 'eth_requestAccounts',
      });

      console.log('accounts---acc', accounts);

      const selectedAccount = accounts[0];
      window.userAddress = selectedAccount;

      if (!selectedAccount) {
        throw new Error('Нэвтрэх хаяг сонгоогүй байна. 👍');
      }

      // Assume setView and setAddress are defined elsewhere
      setView(true);
      toast({
        title: 'Амжилттай.',
        description: 'МетаМаск хаяг амжилттай холбогдлоо',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      customWindow.userAddress = selectedAccount;
      setAddress(selectedAccount); // Ensure setAddress is in scope
      console.log(selectedAccount);

      customWindow.localStorage.setItem(
        'userAddress',
        customWindow.userAddress ?? ''
      );
      setLoad(!load);
    } catch (error: any) {
      console.error('Error while connecting', error);
      let message = '';

      if (error === 'User rejected the request') {
        message = 'Хэрэглэгч холбогдохоос татгалзлаа.';
      } else if (
        error.message ===
        "Request of type 'wallet_requestPermissions' already pending for origin http://localhost:3000. Please wait."
      ) {
        message = 'Холбогдох хүсэлт аль хэдийн илгээсэн байна. Түр хүлээнэ үү';
      } else if (error.message === 'customWindow.ethereum is undefined') {
        message =
          'МетаМаск extension татна уу. Мөн Test(Sepolia testnet chain) горим дээр тохируулна уу https://metamask.io/download';
      } else {
        message = 'МетаМаск хаягтай холбогдож чадсангүй.';
      }

      toast({
        title: 'Алдаа',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      isConnecting = false; // Reset the flag for future connections
    }
  };
  function disconnect() {
    customWindow.userAddress = null;
    window.userAddress = null;
    console.log('run disconnect');
    setAddress('n/a');
    setView(false);
    window.localStorage.removeItem('userAddress');
  }
  async function listen() {
    console.log('Listening for events...');
    const addressUser = window.localStorage.getItem('userAddress');
    if (!customWindow.contract || !customWindow.web3 || !addressUser) {
      console.error('Contract, web3, or user address not available');
      return;
    }

    try {
      const events = await customWindow.contract.getPastEvents('addHash', {
        filter: {
          _exporter: addressUser,
        },
        fromBlock: (await customWindow.web3.eth.getBlockNumber()) - 999,
        toBlock: 'latest',
      });

      if (events && events.length > 0) {
        console.log('Found events:', events);
        // Process the events here, such as updating state or displaying notifications
      } else {
        console.log('No events found');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      console.log('if run', window);
      window.ethereum.on('accountsChanged', function () {
        console.log('window---', window?.userAddress);
        // if (window?.userAddress) {
        console.log('work use effect 1');
        connect();
        // }
      });
    }
  }, []);

  async function getCounters() {
    console.log('window.contract.methods', window.contract.methods);
    await window.contract.methods
      .count_Exporters()
      .call({ from: window.userAddress })
      .then((result: any) => {
        console.log('===---999', result);
        setExplorer(result);
      });

    await window.contract.methods
      .count_hashes()
      .call({ from: window.userAddress })
      .then((result: any) => {
        console.log('getCounters', result);
        setCount(result);
      });
  }
  async function getExporterInfo() {
    const userAddress = window.localStorage.getItem('userAddress');
    console.log('userAddress', userAddress);
    try {
      await window.contract.methods
        .getExporterInfo(userAddress)
        .call({ from: userAddress })

        .then((result: any) => {
          console.log('result', result);
          setName(result ? result : 'n/a');
        });
    } catch (error) {
      setName('n/a');
    }
  }
  async function get_ethBalance() {
    try {
      const balance = await customWindow.web3.eth.getBalance(
        window.localStorage.getItem('userAddress')
      );
      console.log('customWindow.web3.utils', customWindow.web3.utils);
      setBalance(customWindow.web3.utils.fromWei(balance).substr(0, 6));
    } catch (err) {
      setBalance('n/a');
    }
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
        case '0xaa36a7':
          setChainId('Sepolia Test Network');
          break;
        default:
          setChainId('Unknown ChainID');
      }
    } catch (error) {
      setChainId('Unknown ChainID');
    }
  }
  useEffect(() => {
    const onLoad = async () => {
      console.log('onload run yeah');
      const userAddress = window.localStorage.getItem('userAddress');
      setAddress(userAddress || 'n/a');
      setView(userAddress ? true : false);
      if (customWindow.ethereum) {
        console.log('Onload');
        console.log('customWindow.ethereum', customWindow.ethereum);
        (customWindow as any).web3 = new Web3(customWindow.ethereum);
        console.log('-------', customWindow.web3);
        (customWindow as any).contract = new (
          customWindow as any
        ).web3.eth.Contract(CONTRACT.abi, CONTRACT.address);
        if (userAddress && userAddress.length > 10) {
          // if (window.location.pathname == '/admin') {
          await getCounters();
          // }
          await get_ethBalance();
          await getExporterInfo();
          await get_ChainID();

          setTimeout(() => {
            listen();
          }, 0);
        }
      } else {
        setMeta(true);
      }
    };

    onLoad();

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, [load]);
  const fullPath = (query?: { [key: string]: any }, locale?: string) => {
    let fullPath;

    const cleanPath = pathname.replace(/^\/[a-z]{2}(\/|$)/, '');
    if (pathname === '/en' || pathname === '/mn') {
      fullPath = `/${locale || 'en'}`; // Only prepend locale
    } else {
      fullPath = `/${locale || 'en'}/` + cleanPath; // Append locale to pathname
    }
    if (query) {
      const queryParams = new URLSearchParams(query);
      fullPath += '?' + queryParams.toString();
    }
    return fullPath;
  };
  return (
    <AuthContext.Provider
      value={{
        connect,
        disconnect,
        fullPath,
        explorer,
        count,
        address,
        balance,
        name,
        chainId,
        view,
        meta,
        setLoad,
        load,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
