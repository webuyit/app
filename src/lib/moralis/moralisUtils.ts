// lib/axios/moralis.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const moralisClient = axios.create({
  baseURL: 'https://deep-index.moralis.io/api/v2.2',
  headers: {
    accept: 'application/json',
    'X-API-Key': process.env.NEXT_PUBLIC_MORALIS_API_KEY!,
  },
});

export const fetchSociosWalletTokens = async (walletAddress: string) => {
  const { data } = await moralisClient.get(`/wallets/${walletAddress}/tokens`, {
    params: {
      chain: 'chiliz',
    },
  });

  return data; // This will be the array of token balances
};

export const useSociosTokens = (walletAddress?: string) => {
  return useQuery({
    queryKey: ['sociosTokens', walletAddress],
    queryFn: () => fetchSociosWalletTokens(walletAddress!),
    enabled: !!walletAddress,
    refetchInterval: 30_000, // optional live refresh
  });
};
