'use client';

import React, { useEffect, useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEnhancedTokens } from '@/hooks/useEnhancedTokens';
import { CHILIZ_DEMO_WALLET, CHILIZ_LOGO } from '@/lib/constants';
import { useUserStore } from '@/lib/stores/useUserStore';
import { calculateTotalBalanceInUsdAndChz } from '@/lib/tokens';
import { getSociosWalletAddress } from '@/lib/userWallets';
import { User } from '@/types/user';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

type Props = {
  showBalance: boolean;
  setShowBalance: (showBalance: boolean) => void;
};

type BALNCES = {
  usd: number;
  chz: number;
};
export default function TotalBalanceCard({
  setShowBalance,
  showBalance,
}: Props) {
  const user = useUserStore<User>((s) => s.user);
  const walletAddress = getSociosWalletAddress(user);
  const [total, settotal] = useState<BALNCES>({
    usd: 0.0,
    chz: 0.0,
  });

  function formatTokenBalance(balance: number | string): string {
    const parsed = parseFloat(balance as string);

    if (isNaN(parsed) || parsed === 0) return '0.00';

    return parsed.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const {
    data,
    isLoading: enhancedTokensLoading,
    error,
  } = useEnhancedTokens(walletAddress! || user?.wallets[0]?.publicKey);

  useEffect(() => {
    if (!data) return;

    const fetchTotals = async () => {
      const totals = await calculateTotalBalanceInUsdAndChz(data);
      settotal(totals);
    };

    fetchTotals();
  }, [data]);

  return (
    <Card className="bg-gradient-to-br from-primary via-primary to-green-500 text-white shadow-xl">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold opacity-90">Total Balance</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance(!showBalance)}
            className="h-8 w-8 p-0 text-white hover:bg-white/10"
          >
            {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-7 w-7">
            <AvatarImage src={CHILIZ_LOGO} alt="Profile" />
            <AvatarFallback className="bg-primary text-xl font-bold text-white">
              JD
            </AvatarFallback>
          </Avatar>

          <div className="">
            <div className="mb-1 text-3xl font-bold">
              {showBalance ? `${formatTokenBalance(total?.chz)} CHZ` : '••••••'}
            </div>

            <div className="flex items-center text-sm opacity-80">
              ≈{' '}
              {showBalance
                ? `${formatTokenBalance(total?.usd)} USD `
                : '••••••'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
