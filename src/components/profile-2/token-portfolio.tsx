import React from 'react';

import { Coins, Loader2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnhancedTokens } from '@/hooks/useEnhancedTokens';
import { CHILIZ_DEMO_WALLET } from '@/lib/constants';
import { useSociosTokens } from '@/lib/moralis/moralisUtils';
import { useUserStore } from '@/lib/stores/useUserStore';
import { EnhancedToken, formatPriceChange } from '@/lib/tokens';
import { getSociosWalletAddress } from '@/lib/userWallets';
import { truncateMiddle } from '@/lib/utils';
import { User } from '@/types/user';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';

// Mock token data
const mockTokens = [
  {
    id: 1,
    name: 'OG Fan Token',
    symbol: 'OG',
    balance: '2,450.00',
    price: '$3.00',
    change: '+0.01%',
    logo: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252Ff594c394-3ec4-4aae-ac16-4110d9a4ecfb%3Falt%3Dmedia%26token%3D7c55229c-f207-4408-8174-e01451912632&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },
  {
    id: 2,
    name: 'Santos FC Fan Token',
    symbol: 'SANTOS',
    balance: '$22.6',
    price: '$2.8',
    change: '+2.41%',
    logo: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252F5987aa38-183a-40ac-9884-a7e4c813c0ff%3Falt%3Dmedia%26token%3D534e03da-f4a1-4bb0-9138-9af0d49ccd27&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },
  {
    id: 3,
    name: 'Paris Saint-Germain Fan Token',
    symbol: 'PSG',
    balance: '0.0234',
    price: '2.8',
    change: '-1.23%',
    logo: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252Fbcc570e7-d233-42a6-858c-4c6d126501ca%3Falt%3Dmedia%26token%3D10112bc1-6807-4df4-b44a-8a2f169c2c6a&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },
  {
    id: 4,
    name: 'Juventus Fan Token',
    symbol: 'JUV',
    balance: '$2001',
    price: '$0.85',
    change: '+5.67%',
    logo: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252Fa5103db7-5be1-465b-9127-6c528c5e1652%3Falt%3Dmedia%26token%3Dfbbe3678-9328-407e-bc32-056b8cbed091&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },
];

export default function TokenPorfolio() {
  const user = useUserStore<User>((s) => s.user);
  const walletAddress = getSociosWalletAddress(user);

  function formatTokenBalance(balance: string): string {
    const value = parseFloat(balance);

    if (isNaN(value)) return '0.00';

    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + 'B';
    }
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + 'M';
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(2) + 'K';
    }

    return value.toFixed(2); // fallback: round to 2 decimals
  }

  function formatTokenValue(value: number): string {
    if (value < 0.01 && value > 0) {
      return value.toFixed(6); // ultra-low values
    }

    if (value < 1) {
      return value.toFixed(3); // e.g., 0.042
    }

    return value.toFixed(2); // e.g., 1.25, 150.00
  }

  /*const {
    data: tokens,
    isLoading,
    isError,
  } = useSociosTokens(CHILIZ_DEMO_WALLET!);*/
  //console.log('Tokens', tokens);
  const {
    data,
    isLoading: enhancedTokensLoading,
    error,
  } = useEnhancedTokens(walletAddress!);

  if (enhancedTokensLoading) {
    return (
      <div className="my-3 flex w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Coins size={20} />
          <span>Token Portfolio</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {data?.map((token: EnhancedToken, index) => {
            const { changeUsd, changePercent, isPositive, indicator } =
              formatPriceChange(
                token.price_change_usd_24h,
                token.price_change_percent_24h,
              );

            return (
              <div key={index}>
                <div className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={token.logo} alt="Profile" />
                      <AvatarFallback className="bg-primary text-xl font-bold text-white">
                        {token.symbol}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">
                        {truncateMiddle(token.name, 10, 7, 18)}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {token.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {formatTokenBalance(token.balance_formatted)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        ${formatTokenValue(token.usd_price)}
                      </span>
                      <span
                        className={`${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {changePercent}
                      </span>
                    </div>
                  </div>
                </div>
                {index < mockTokens.length - 1 && (
                  <Separator className="mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
