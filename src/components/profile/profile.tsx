'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import {
  Banknote,
  Coins,
  Copy,
  DollarSign,
  Download,
  Eye,
  EyeOff,
  History,
  Lock,
  Moon,
  Plus,
  Search,
  Sun,
  Ticket,
  TrendingDown,
  TrendingUp,
  Upload,
  User as UserIcon,
  Wallet,
  Zap,
} from 'lucide-react';
import { useAccount } from 'wagmi';

import { BottomNavigation } from '@/components/bottom-navigation';
import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useRegisterWallet } from '@/hooks/useRegisterSociosWallet';
import { CHILIZ_LOGO, SERVER_URL } from '@/lib/constants';
import { useUserStore } from '@/lib/stores/useUserStore';
import { formatRelativeTime, getTransactionTitle } from '@/lib/ui-utils';
import { hasSociosWallet } from '@/lib/userWallets';
import { truncateMiddle } from '@/lib/utils';
import { TRANSACTION } from '@/types/types';
import { User } from '@/types/user';

import { ChaserSwapDrawer } from '../chaser-swap-drawar';
import InitUserClient from '../initUserClient';
import TokenPorfolio from '../profile-2/token-portfolio';
import TotalBalanceCard from '../profile-2/total-balance-card';
import WalletQuickActions from '../profile-2/wallet-quick-actions';
import WalletTabHeader from '../profile-2/wallet-tab-header';

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: 'deposit',
    amount: '+500.00',
    description: 'CHZ Deposit',
    date: '2 hours ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'bet_win',
    amount: '+125.00',
    description: 'LeBron James - Points Over',
    date: '1 day ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'withdrawal',
    amount: '-200.00',
    description: 'Sell chaser',
    date: '2 days ago',
    status: 'completed',
  },
  {
    id: 4,
    type: 'bet_loss',
    amount: '-75.00',
    description: 'Tom Brady - Passing Yards',
    date: '3 days ago',
    status: 'completed',
  },
  {
    id: 5,
    type: 'deposit',
    amount: '+1000.00',
    description: 'INTER deposit',
    date: '1 week ago',
    status: 'completed',
  },
];

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

type Props = {
  transactions: TRANSACTION[];
};

export default function Profile({ transactions }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isWalletRegisterSuccess, setisWalletRegisterSuccess] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const { toast } = useToast();
  const user = useUserStore<User>((s) => s.user);
  const params = useParams();
  const userId = params.profileId as string;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      //document.documentElement.classList.add('dark');
      //localStorage.setItem('theme', 'dark');
    } else {
      // document.documentElement.classList.remove('dark');
      //localStorage.setItem('theme', 'light');
    }

    toast({
      title: `${!isDarkMode ? 'Dark' : 'Light'} mode enabled`,
      description: 'Theme preference saved',
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'DEPOSIT':
        return <Download className="text-green-600" size={16} />;
      case 'WITHDRAW':
        return <Upload className="text-red-600" size={16} />;
      case 'BET_WON':
        return <TrendingUp className="text-green-600" size={16} />;
      case 'BET_LOST':
        return <TrendingDown className="text-red-600" size={16} />;
      case 'BET_PLACED':
        return <Ticket className="text-green-600" size={16} />;
      default:
        return <DollarSign className="text-gray-600" size={16} />;
    }
  };

  const formatCurrency = (amount: string) => {
    return `$${amount}`;
  };

  const isSociosConnected = hasSociosWallet(user?.wallets);

  // REGISTER SOCIOS WALLET
  useRegisterWallet({
    userId: userId, // from params
    walletSource: 'SOCIOS',
    setisWalletRegisterSuccess,
  });

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 md:mx-auto md:max-w-md md:border-x md:border-gray-200">
      <Header />
      <InitUserClient />
      <div className="px-4 py-6 pb-20">
        {/* Profile Header */}
        <div className="mb-6 text-center">
          <Avatar className="ring-primary/20 mx-auto mb-4 h-24 w-24 ring-4">
            <AvatarImage src={user?.profilePicture} alt="Profile" />
            <AvatarFallback className="bg-primary text-xl font-bold text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
            {user?.fullName}
          </h1>
          <p className="hidden text-gray-600 dark:text-gray-400">
            Premium Athlete Trader
          </p>
          <Badge className="bg-primary/10 border-primary/20 mt-2 text-primary">
            <Zap size={12} className="mr-1" />
            Early Member
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <UserIcon size={16} />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center space-x-2">
              <Wallet size={16} />
              <span>Wallet</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Overview Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Balance Card */}
            <TotalBalanceCard
              setShowBalance={setShowBalance}
              showBalance={showBalance}
            />

            {/* Chaser Balance Card */}
            <Card className="border-primary/20 from-primary/5 border-2 bg-gradient-to-r to-green-500/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <Coins size={20} className="hidden text-primary" />
                      <Image
                        src={`/img/coin.png`}
                        width={20}
                        height={20}
                        alt="currency"
                        className=""
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Chaser Balance
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {showBalance ? '24,500' : '••••••'}
                      </p>
                      <p className="text-xs text-gray-500">
                        ≈ {showBalance ? '245.00' : '••••••'} USD
                      </p>
                    </div>
                  </div>
                  <ChaserSwapDrawer
                    trigger={
                      <Button
                        size="sm"
                        className="hover:bg-primary/90 bg-primary px-4 text-white"
                      >
                        <Plus size={16} className="mr-1" />
                        Buy
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Button
                      disabled={true}
                      className="h-14 w-full cursor-not-allowed flex-col space-y-1 bg-green-600 text-white hover:bg-green-700"
                    >
                      <Download size={20} />
                      <span className="text-sm">Deposit</span>
                    </Button>
                    <div className="absolute -right-2 -top-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400">
                        <Lock size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This feature is turned off for now. Stay tuned for updates
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative">
                    <Button
                      disabled={true}
                      variant={'outline'}
                      className="h-14 w-full flex-col space-y-1 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                    >
                      <Upload size={20} />
                      <span className="text-sm">Withdraw</span>
                    </Button>
                    <div className="absolute -right-2 -top-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400">
                        <Lock size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    This feature is turned off for now. Stay tuned for updates
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Theme Toggle */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Toggle between light and dark themes
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleTheme}
                    className="data-[state=checked]:bg-primary"
                    disabled={false}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History size={20} />
                  <span>Recent Transactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {/* Empty State */}
                  {transactions.length === 0 && (
                    <div className="py-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <Search className="text-gray-400" size={24} />
                      </div>
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        No Transactions found
                      </h3>
                    </div>
                  )}
                  {transactions.length > 0 &&
                    transactions.map((transaction: TRANSACTION, index) => (
                      <div key={transaction.id}>
                        <div className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">
                                {getTransactionTitle(transaction.type)}
                              </h4>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                {formatRelativeTime(transaction.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-sm font-medium ${
                                transaction.type === 'DEPOSIT' ||
                                transaction.type === 'BET_PLACED'
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {transaction.amount.toFixed(2)}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              Completed
                            </Badge>
                          </div>
                        </div>
                        {index < mockTransactions.length - 1 && (
                          <Separator className="mx-4" />
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-6">
            {isSociosConnected || isWalletRegisterSuccess ? (
              <div className="space-y-6">
                <WalletTabHeader />
                <TokenPorfolio />
                <WalletQuickActions />
              </div>
            ) : (
              <div className="flex w-full items-center justify-center">
                <Button
                  size={'lg'}
                  onClick={openConnectModal}
                  disabled={isConnected}
                >
                  Connect Socios Wallet
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
}
