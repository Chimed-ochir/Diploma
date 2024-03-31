'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
  address: string | null;
  count: number | null;
  explorer: number | null;
  balance: string;
  name: string;
  chainId: string;
  view: boolean;
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
  interface CustomWindow extends Window {
    ethereum?: any;
    userAddress?: string | null;
    contract?: any;
    web3?: any; // Declare the web3 property
  }
  const customWindow: CustomWindow =
    typeof window !== 'undefined' ? window : ({} as CustomWindow);

  const connect = async () => {
    console.log('Connecting');
    if (typeof customWindow.ethereum !== 'undefined') {
      try {
        const accounts = await customWindow.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const selectedAccount = accounts[0];

        if (!selectedAccount) {
          throw new Error('Нэвтрэх хаяг сонгоогүй байна. 👍');
        }
        setView(true);
        toast({
          title: 'Амжилттай.',
          description: 'МетаМаск хаяг амжилттай холбогдлоо',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        customWindow.userAddress = selectedAccount;
        setAddress(selectedAccount);
        console.log(selectedAccount);
        customWindow.localStorage.setItem(
          'userAddress',
          customWindow.userAddress ?? ''
        ); // Use optional chaining or a fallback value
        // window.location.reload();
        // customWindow.location.reload();
      } catch (error) {
        console.error(error);
        // Handle error, perhaps show a message to the user
      }
    } else {
      // Handle case where window.ethereum is not available
      // Disable buttons or show a warning
      toast({
        title: 'МетаМаск extention байхгүй байна.',
        description: 'МетаМаск суулгана уу.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  function disconnect() {
    customWindow.userAddress = null;
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
      console.log('if run');
      window.ethereum.on('accountsChanged', function () {
        console.log('work use effect 1');
        connect();
      });
    }
  }, []);

  async function getCounters() {
    console.log('window.contract.methods', window.contract.methods);
    await window.contract.methods
      .count_Exporters()
      .call({ from: window.userAddress })
      .then((result: any) => {
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
    try {
      await window.contract.methods
        .getExporterInfo(userAddress)
        .call({ from: userAddress })

        .then((result: any) => {
          console.log('result', result);
          setName(result);
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
        default:
          setChainId('Unknown ChainID');
      }
    } catch (error) {
      console.error('Error getting chain ID:', error);
      setChainId('Unknown ChainID');
    }
  }
  useEffect(() => {
    const onLoad = async () => {
      const userAddress = window.localStorage.getItem('userAddress');
      setAddress(userAddress || 'n/a');
      setView(userAddress ? true : false);
      if (customWindow.ethereum) {
        console.log('Onload');
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
      }
    };

    onLoad();

    return () => {
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        connect,
        disconnect,
        explorer,
        count,
        address,
        balance,
        name,
        chainId,
        view,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
