import { useQuery } from '@tanstack/react-query';

import { CHILIZ_DEMO_WALLET } from '@/lib/constants';
import { fetchSociosWalletTokens } from '@/lib/moralis/moralisUtils';
import { enhanceMoralisTokens } from '@/lib/tokens';

export const useEnhancedTokens = (walletAddress?: string) => {
  return useQuery({
    queryKey: ['enhancedTokens', walletAddress],
    enabled: !!walletAddress,
    queryFn: async () => {
      const rawTokens = await fetchSociosWalletTokens(walletAddress!);
      console.log('raw tokens', rawTokens.result);

      return enhanceMoralisTokens(
        rawTokens?.result,
        ['CHZ', 'JUV', 'CITY', 'PSG', 'BAR'], // ordering
        5, // limit
      );
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
