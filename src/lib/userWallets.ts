import { User } from '@/types/user';

export const hasSociosWallet = (
  wallets: { walletSource: string; active: boolean }[] = [],
) => {
  return wallets.some(
    (wallet) => wallet.walletSource === 'SOCIOS' && wallet.active,
  );
};

export const getSociosWalletAddress = (user: User): string | null => {
  if (!user || !user.wallets) return null;

  const sociosWallet = user.wallets.find(
    (wallet) => wallet.walletSource === 'SOCIOS' && wallet.active,
  );

  return sociosWallet?.publicKey || null;
};
