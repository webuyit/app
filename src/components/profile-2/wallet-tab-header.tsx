import React from 'react';

import { Copy } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useUserStore } from '@/lib/stores/useUserStore';
import { getSociosWalletAddress } from '@/lib/userWallets';
import { User } from '@/types/user';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

export default function WalletTabHeader() {
  const user = useUserStore<User>((s) => s.user);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(user?.wallets[0].publicKey as string);
      toast({
        title: 'Address copied!',
        description: 'Wallet address copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Unable to copy address to clipboard',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <CardContent className="p-6">
        <h3 className="mb-4 text-lg font-semibold opacity-90">
          Wallet Address
        </h3>
        <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
          <span className="truncate font-mono text-sm">
            {getSociosWalletAddress(user)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyAddress}
            className="h-8 w-8 p-0 text-white hover:bg-white/10"
          >
            <Copy size={14} />
          </Button>
        </div>
        <p className="mt-2 text-xs opacity-70">
          This is your unique wallet address for receiving tokens
        </p>
      </CardContent>
    </Card>
  );
}
