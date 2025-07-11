// hooks/useRegisterWallet.ts
import { useEffect, useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAccount } from 'wagmi';

import { SERVER_URL } from '@/lib/constants';
import { useUserStore } from '@/lib/stores/useUserStore';
import { hasSociosWallet } from '@/lib/userWallets';
import { User } from '@/types/user';

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
  setisWalletRegisterSuccess,
}: {
  userId: string;
  walletSource?: string;
  chain?: string;
  setisWalletRegisterSuccess: (arg0: boolean) => void;
}) => {
  const { address, isConnected } = useAccount();
  const queryClient = useQueryClient();
  const user = useUserStore<User>((s) => s.user);
  const alreadyRegistered = useRef<string | null>(null);
  const isSociosConnected = hasSociosWallet(user?.wallets);
  // if socios is connected don't register new wallet

  // Register wallet
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
      setisWalletRegisterSuccess(true);
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
    if (!userId || !address || !isConnected || isSociosConnected) return;

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
