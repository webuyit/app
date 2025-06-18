'use client';

import { useEffect, useState } from 'react';

import {
  Banknote,
  Coins,
  Copy,
  DollarSign,
  Download,
  Eye,
  EyeOff,
  History,
  Moon,
  Sun,
  TrendingDown,
  TrendingUp,
  Upload,
  User,
  Wallet,
  Zap,
} from 'lucide-react';

import { BottomNavigation } from '@/components/bottom-navigation';
import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: 'deposit',
    amount: '+500.00',
    description: 'Bank Deposit',
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
    description: 'Bank Withdrawal',
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
    description: 'Credit Card Deposit',
    date: '1 week ago',
    status: 'completed',
  },
];

// Mock token data
const mockTokens = [
  {
    id: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    balance: '2,450.00',
    price: '$1.00',
    change: '+0.01%',
    logo: '💵',
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    balance: '0.5421',
    price: '$2,247.83',
    change: '+2.41%',
    logo: '💎',
  },
  {
    id: 3,
    name: 'Bitcoin',
    symbol: 'BTC',
    balance: '0.0234',
    price: '$43,125.67',
    change: '-1.23%',
    logo: '₿',
  },
  {
    id: 4,
    name: 'AthleteBet Token',
    symbol: 'ABT',
    balance: '1,250.00',
    price: '$0.85',
    change: '+5.67%',
    logo: '🏆',
  },
];

export default function Profile() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [walletAddress] = useState('0x742d35Cc8bF9f9B8264...3f1a7E');
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    toast({
      title: `${!isDarkMode ? 'Dark' : 'Light'} mode enabled`,
      description: 'Theme preference saved',
    });
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText('0x742d35Cc8bF9f9B8264f3c1a7E');
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <Download className="text-green-600" size={16} />;
      case 'withdrawal':
        return <Upload className="text-red-600" size={16} />;
      case 'bet_win':
        return <TrendingUp className="text-green-600" size={16} />;
      case 'bet_loss':
        return <TrendingDown className="text-red-600" size={16} />;
      default:
        return <DollarSign className="text-gray-600" size={16} />;
    }
  };

  const formatCurrency = (amount: string) => {
    return `$${amount}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900 md:mx-auto md:max-w-md md:border-x md:border-gray-200">
      <Header />

      <div className="px-4 py-6 pb-20">
        {/* Profile Header */}
        <div className="mb-6 text-center">
          <Avatar className="ring-primary/20 mx-auto mb-4 h-24 w-24 ring-4">
            <AvatarImage
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces"
              alt="Profile"
            />
            <AvatarFallback className="bg-primary text-xl font-bold text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <h1 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">
            John Doe
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Premium Athlete Trader
          </p>
          <Badge className="bg-primary/10 border-primary/20 mt-2 text-primary">
            <Zap size={12} className="mr-1" />
            VIP Member
          </Badge>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User size={16} />
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
            <Card className="bg-gradient-to-br from-primary via-primary to-green-500 text-white shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold opacity-90">
                    Total Balance
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="h-8 w-8 p-0 text-white hover:bg-white/10"
                  >
                    {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                  </Button>
                </div>
                <div className="mb-2 text-3xl font-bold">
                  {showBalance ? '$2,450.00' : '••••••'}
                </div>
                <div className="flex items-center text-sm opacity-80">
                  <TrendingUp size={14} className="mr-1" />
                  +$125.00 this week
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-14 flex-col space-y-1 bg-green-600 text-white hover:bg-green-700">
                <Download size={20} />
                <span className="text-sm">Deposit</span>
              </Button>
              <Button
                variant="outline"
                className="h-14 flex-col space-y-1 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                <Upload size={20} />
                <span className="text-sm">Withdraw</span>
              </Button>
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
                  {mockTransactions.map((transaction, index) => (
                    <div key={transaction.id}>
                      <div className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              {transaction.description}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-sm font-medium ${
                              transaction.amount.startsWith('+')
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {transaction.amount}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {transaction.status}
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
            {/* Wallet Address Card */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <h3 className="mb-4 text-lg font-semibold opacity-90">
                  Wallet Address
                </h3>
                <div className="flex items-center justify-between rounded-lg bg-black/20 p-3">
                  <span className="font-mono text-sm">{walletAddress}</span>
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

            {/* Token Portfolio */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins size={20} />
                  <span>Token Portfolio</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {mockTokens.map((token, index) => (
                    <div key={token.id}>
                      <div className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-lg dark:bg-gray-800">
                            {token.logo}
                          </div>
                          <div>
                            <h4 className="font-medium">{token.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {token.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{token.balance}</div>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              {token.price}
                            </span>
                            <span
                              className={`${
                                token.change.startsWith('+')
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {token.change}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < mockTokens.length - 1 && (
                        <Separator className="mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions for Wallet */}
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="h-16 flex-col space-y-1">
                <Banknote size={20} />
                <span className="text-xs">Buy Crypto</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-1">
                <Upload size={20} />
                <span className="text-xs">Send</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col space-y-1">
                <Download size={20} />
                <span className="text-xs">Receive</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
}
