'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowBigDown,
  ArrowDown,
  ArrowRight,
  ArrowUpDown,
  CheckCircle,
  Coins,
  DollarSign,
  Lock,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { truncateMiddle } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  price: number; // Price in USD
  chaserRate: number; // How many Chaser per 1 token
}

interface ChaserBundle {
  id: string;
  amount: number;
  bonus: number;
  discount: string;
  recommended?: boolean;
}

interface ChaserSwapDrawerProps {
  trigger: React.ReactNode;
  disabled?: boolean;
}

const TOKENS: Token[] = [
  {
    symbol: 'ETH',
    name: 'Ethereum',
    icon: '💎',
    balance: '0',
    price: 3200,
    chaserRate: 320000, // 1 ETH = 320,000 Chaser
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: '💵',
    balance: '1,250.50',
    price: 1,
    chaserRate: 100, // 1 USDC = 100 Chaser
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    icon: '🟢',
    balance: '890.25',
    price: 1,
    chaserRate: 100,
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: '₿',
    balance: '0.0823',
    price: 45000,
    chaserRate: 4500000, // 1 BTC = 4.5M Chaser
  },
];

// Mock token data
const mockTokens: Token[] = [
  {
    //id: 1,
    name: 'OG Fan Token',
    symbol: 'OG',
    balance: '2,450.00',
    price: 3.7,
    //change: '+0.01%',
    icon: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252Ff594c394-3ec4-4aae-ac16-4110d9a4ecfb%3Falt%3Dmedia%26token%3D7c55229c-f207-4408-8174-e01451912632&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
    chaserRate: 300,
  },
  {
    //id: 3,
    name: 'Paris Saint-Germain Fan Token',
    symbol: 'PSG',
    balance: '0.0234',
    price: 2.8,
    //change: '-1.23%',
    chaserRate: 208,
    icon: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252Fbcc570e7-d233-42a6-858c-4c6d126501ca%3Falt%3Dmedia%26token%3D10112bc1-6807-4df4-b44a-8a2f169c2c6a&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },
  {
    //id: 2,
    name: 'Santos FC Fan Token',
    symbol: 'SANTOS',
    balance: '22.6',
    price: 2.8,
    //change: '+2.41%',
    chaserRate: 202,
    icon: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252F5987aa38-183a-40ac-9884-a7e4c813c0ff%3Falt%3Dmedia%26token%3D534e03da-f4a1-4bb0-9138-9af0d49ccd27&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },

  {
    //id: 4,
    name: 'Juventus Fan Token',
    symbol: 'JUV',
    balance: '2001',
    price: 0.85,
    // change: '+5.67%',
    chaserRate: 85,
    icon: 'https://www.fantokens.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffmc-27374.appspot.com%2Fo%2Ftokens%252Fa5103db7-5be1-465b-9127-6c528c5e1652%3Falt%3Dmedia%26token%3Dfbbe3678-9328-407e-bc32-056b8cbed091&w=48&q=75&dpl=dpl_VtpN26CmG4bEU3sAhAL7d6nZNj9j',
  },
];

const CHASER_BUNDLES: ChaserBundle[] = [
  { id: 'starter', amount: 1000, bonus: 0, discount: '' },
  {
    id: 'popular',
    amount: 5000,
    bonus: 250,
    discount: '5% bonus',
    recommended: true,
  },
  { id: 'premium', amount: 10000, bonus: 750, discount: '7.5% bonus' },
  { id: 'whale', amount: 25000, bonus: 2500, discount: '10% bonus' },
];

const QUICK_AMOUNTS = [10, 25, 50, 100];

export function ChaserSwapDrawer({
  trigger,
  disabled = false,
}: ChaserSwapDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [swapDirection, setSwapDirection] = useState<'buy' | 'sell'>('buy');
  const [selectedToken, setSelectedToken] = useState<Token>(mockTokens[1]); // Default to USDC
  const [inputAmount, setInputAmount] = useState('');
  const [outputAmount, setOutputAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  // Calculate output amount based on input
  useEffect(() => {
    if (inputAmount && !isNaN(parseFloat(inputAmount))) {
      const amount = parseFloat(inputAmount);
      if (swapDirection === 'buy') {
        // Token -> Chaser
        const chaserAmount = amount * selectedToken.chaserRate;
        setOutputAmount(chaserAmount.toLocaleString());
      } else {
        // Chaser -> Token
        const tokenAmount = amount / selectedToken.chaserRate;
        setOutputAmount(tokenAmount.toFixed(6));
      }
    } else {
      setOutputAmount('');
    }
  }, [inputAmount, selectedToken, swapDirection]);

  const handleQuickAmount = (amount: number) => {
    setInputAmount(amount.toString());
    setSelectedBundle(null);
  };

  const handleBundleSelect = (bundle: ChaserBundle) => {
    const totalChaser = bundle.amount + bundle.bonus;
    const tokenAmount = totalChaser / selectedToken.chaserRate;
    setInputAmount(tokenAmount.toString());
    setOutputAmount(totalChaser.toLocaleString());
    setSelectedBundle(bundle.id);
  };

  const handleSwapDirection = () => {
    setSwapDirection(swapDirection === 'buy' ? 'sell' : 'buy');
    setInputAmount('');
    setOutputAmount('');
    setSelectedBundle(null);
  };

  const handleSwap = () => {
    // Simulate swap process
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setInputAmount('');
      setOutputAmount('');
      setSelectedBundle(null);
    }, 3000);
  };

  const getHeaderContent = () => {
    if (swapDirection === 'buy') {
      return {
        title: 'Buy Chaser',
        subtitle: 'Welcome! Ready to stack some Chaser?',
        gradient: 'from-green-500 to-emerald-600',
        icon: <TrendingUp size={24} className="text-green-600" />,
      };
    } else {
      return {
        title: 'Sell Chaser',
        subtitle: `You're selling your Chaser for ${selectedToken.symbol}. Good luck out there!`,
        gradient: 'from-orange-500 to-red-600',
        icon: <DollarSign size={24} className="text-orange-600" />,
      };
    }
  };

  const headerContent = getHeaderContent();

  if (disabled) {
    return (
      <div className="relative">
        <Button
          disabled
          className="w-full cursor-not-allowed bg-gray-100 text-gray-400"
        >
          <Lock size={16} className="mr-2" />
          Buy Chaser
        </Button>
        <div className="absolute -right-2 -top-2">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400">
            <Lock size={12} className="text-white" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent className="max-h-[90vh] bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-md">
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-6 p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
                >
                  <CheckCircle size={40} className="text-green-600" />
                </motion.div>

                <div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Swap Successful!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {swapDirection === 'buy'
                      ? `You received ${outputAmount} Chaser for ${inputAmount} ${selectedToken.symbol}`
                      : `You received ${outputAmount} ${selectedToken.symbol} for ${inputAmount} Chaser`}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <Sparkles size={16} className="text-yellow-500" />
                  <span>Transaction completed in 2.3 seconds</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="swap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 px-2 py-6"
              >
                {/* Header */}

                <div className="space-y-3 text-center">
                  <div
                    className={`mx-auto h-16 w-16 rounded-full bg-gradient-to-r ${headerContent.gradient} flex items-center justify-center p-3`}
                  >
                    <Coins size={32} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {headerContent.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {headerContent.subtitle}
                    </p>
                  </div>
                </div>

                {/* Swap Direction Toggle */}
                <div className="flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSwapDirection}
                    className="flex items-center space-x-2"
                  >
                    <ArrowUpDown size={16} />
                    <span>
                      {swapDirection === 'buy'
                        ? 'Switch to Sell'
                        : 'Switch to Buy'}
                    </span>
                  </Button>
                </div>

                {/*Swap contents */}
                <div className="scrollbar-hide max-h-[60vh] overflow-y-auto">
                  {/* Token Selection */}
                  <div className="mb-3 space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {swapDirection === 'buy' ? 'Pay with' : 'Receive'}
                    </label>
                    <Select
                      value={selectedToken.symbol}
                      onValueChange={(value) => {
                        const token = mockTokens.find(
                          (t) => t.symbol === value,
                        );
                        if (token) setSelectedToken(token);
                      }}
                    >
                      <SelectTrigger className="h-12 w-full focus:border focus:ring-0 focus:ring-offset-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="">
                        {mockTokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={token.icon} alt="Profile" />
                                <AvatarFallback className="bg-primary text-xl font-bold text-white">
                                  JD
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="text-start text-sm">
                                  {token.symbol}
                                </div>
                                <div className="text-start text-xs text-gray-500">
                                  {truncateMiddle(token.name, 5, 5, 8)}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>
                        Balance: {selectedToken.balance} {selectedToken.symbol}
                      </span>
                      <span>
                        $
                        {(
                          parseFloat(selectedToken.balance.replace(',', '')) *
                          selectedToken.price
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  {swapDirection === 'buy' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Quick amounts ({selectedToken.symbol})
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {QUICK_AMOUNTS.map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAmount(amount)}
                            className="text-xs"
                          >
                            {amount}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chaser Bundles */}
                  {swapDirection === 'buy' && (
                    <div className="mt-3 space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Chaser Bundles
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {CHASER_BUNDLES.map((bundle) => (
                          <Card
                            key={bundle.id}
                            className={`cursor-pointer transition-all ${
                              selectedBundle === bundle.id
                                ? 'border-primary ring-2 ring-primary'
                                : 'hover:border-gray-300'
                            } ${bundle.recommended ? 'ring-1 ring-yellow-400' : ''}`}
                            onClick={() => handleBundleSelect(bundle)}
                          >
                            <CardContent className="p-3">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">
                                    {(
                                      bundle.amount + bundle.bonus
                                    ).toLocaleString()}{' '}
                                    Chaser
                                  </span>
                                  {bundle.recommended && (
                                    <Star
                                      size={12}
                                      className="fill-current text-yellow-500"
                                    />
                                  )}
                                </div>
                                {bundle.bonus > 0 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    +{bundle.bonus.toLocaleString()} bonus
                                  </Badge>
                                )}
                                {bundle.discount && (
                                  <div className="text-xs font-medium text-green-600">
                                    {bundle.discount}
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Swap Interface */}
                  <div className="space-y-4">
                    {/* Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {swapDirection === 'buy' ? 'You pay' : 'You send'}
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={inputAmount}
                          onChange={(e) => setInputAmount(e.target.value)}
                          className="border border-input pr-16 text-lg font-medium ring-0 focus:border-muted focus:outline-none focus:ring-0 focus:ring-offset-0"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="text-sm font-medium text-gray-500">
                            {swapDirection === 'buy'
                              ? selectedToken.symbol
                              : 'Chaser'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                        <ArrowDown
                          size={16}
                          className="text-gray-600 dark:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Output */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {swapDirection === 'buy' ? 'You receive' : 'You get'}
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="0"
                          value={outputAmount}
                          readOnly
                          className="bg-gray-50 pr-16 text-lg font-medium dark:bg-gray-800"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className="text-sm font-medium text-gray-500">
                            {swapDirection === 'buy'
                              ? 'Chaser'
                              : selectedToken.symbol}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Exchange Rate */}
                    {inputAmount && (
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        1{' '}
                        {swapDirection === 'buy'
                          ? selectedToken.symbol
                          : 'Chaser'}{' '}
                        ={' '}
                        {swapDirection === 'buy'
                          ? selectedToken.chaserRate.toLocaleString()
                          : (1 / selectedToken.chaserRate).toFixed(6)}{' '}
                        {swapDirection === 'buy'
                          ? 'Chaser'
                          : selectedToken.symbol}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Action Button */}
                  <div className="sticky bottom-0 border-t bg-white pt-4 dark:bg-gray-900">
                    <Button
                      onClick={handleSwap}
                      disabled={!inputAmount || !outputAmount}
                      className={`w-full bg-gradient-to-r py-3 font-medium text-white ${headerContent.gradient} transition-opacity hover:opacity-90`}
                      size="lg"
                    >
                      <Wallet size={20} className="mr-2" />
                      {swapDirection === 'buy' ? 'Buy Chaser' : 'Sell Chaser'}
                    </Button>

                    {/* Info */}
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                      Exchange rate: 100 Chaser = $1.00 USD
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
