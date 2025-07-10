// hooks/useRegisterWallet.ts
import { useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';

import { SERVER_URL } from '@/lib/constants';

import { toast } from './use-toast';

type REGISTER_WALLET_PROPS = {
  userId: string;
  publicKey: string;
  walletSource: string;
};
export const useRegisterWallet = ({
  userId,
  walletSource = 'SOCIOS',
  chain = 'CHILIZ',
}: {
  userId: string;
  walletSource?: string;
  chain?: string;
}) => {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const alreadyRegistered = useRef<string | null>(null);

  // Register walleet
  const mutation = useMutation({
    mutationFn: async (data: REGISTER_WALLET_PROPS) => {
      const res = await axios.post(`${SERVER_URL}users/wallets`, data);
      return res.data;
    },
    onSuccess: () => {
      /*toast({
            title: 'Tournament added successfully!',
          });*/
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });

      console.log('Mutation error', error);
    },
  });

  useEffect(() => {
    if (!userId || !address || !isConnected) return;

    // Prevent double execution
    if (alreadyRegistered.current === address.toLowerCase()) return;

    const registerWallet = async () => {
      try {
        /* await axios.post('/api/users/wallets', {
          userId,
          publicKey: address,
          walletSource,
          chain,
        });*/
        await mutation.mutateAsync({
          userId,
          walletSource,
          publicKey: address,
        });
        alreadyRegistered.current = address.toLowerCase();
        console.log('✅ Wallet registered:', address);
      } catch (err) {
        console.error('❌ Wallet registration failed:', err);
      }
    };

    registerWallet();
  }, [address, isConnected, userId, walletSource, chain]);
};
