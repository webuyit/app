'use client';

import { useState } from 'react';

import {
  Calculator,
  Crown,
  DollarSign,
  Globe,
  Key,
  Lock,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface BetMarket {
  id: string;
  title: string;
  description: string;
  player: {
    name: string;
    imageUrl: string;
    sport: string;
  };
  outcomes: Array<{
    id: string;
    label: string;
    odds: number;
    probability: number;
  }>;
  tvl: string;
  volume24h: string;
  endDate: string;
  linkedTournaments: Array<{
    id: string;
    name: string;
    type: 'OPEN' | 'PRIVATE' | 'PREMIUM' | 'GATED';
    prize: string;
    participants: number;
  }>;
}

interface BettingDrawerProps {
  market: BetMarket;
  trigger: React.ReactNode;
}

export function BettingDrawer({ market, trigger }: BettingDrawerProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedOutcomeData = market.outcomes.find(
    (o) => o.id === selectedOutcome,
  );
  const potentialPayout =
    selectedOutcomeData && stakeAmount
      ? (parseFloat(stakeAmount) * selectedOutcomeData.odds).toFixed(2)
      : '0.00';
  const potentialProfit =
    selectedOutcomeData && stakeAmount
      ? (
          parseFloat(stakeAmount) * selectedOutcomeData.odds -
          parseFloat(stakeAmount)
        ).toFixed(2)
      : '0.00';

  const getTournamentIcon = (type: string) => {
    switch (type) {
      case 'OPEN':
        return <Globe size={14} />;
      case 'PRIVATE':
        return <Lock size={14} />;
      case 'PREMIUM':
        return <Crown size={14} />;
      case 'GATED':
        return <Key size={14} />;
      default:
        return <Trophy size={14} />;
    }
  };

  const getTournamentBadgeStyle = (type: string) => {
    switch (type) {
      case 'OPEN':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PRIVATE':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'PREMIUM':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0';
      case 'GATED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handlePlaceBet = () => {
    if (!selectedOutcome || !stakeAmount) return;

    // Here you would integrate with your betting API
    console.log('Placing bet:', {
      marketId: market.id,
      outcomeId: selectedOutcome,
      stake: stakeAmount,
      potentialPayout,
    });

    setIsOpen(false);
    // Reset form
    setSelectedOutcome(null);
    setStakeAmount('');
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>

      <DrawerContent className="max-h-[90vh] bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader className="pb-4 text-center">
            <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <img
                src={market.player.imageUrl}
                alt={market.player.name}
                className="h-full w-full object-cover"
              />
            </div>
            <DrawerTitle className="text-lg font-bold capitalize text-gray-900 dark:text-white">
              {market.title}
            </DrawerTitle>
            <DrawerDescription className="text-sm capitalize text-gray-600 dark:text-gray-400">
              {market.description}
            </DrawerDescription>
            <div className="mt-2 flex items-center justify-center space-x-2">
              <Badge className="border-primary/20 bg-primary/10 text-primary">
                {market.player.sport}
              </Badge>
              <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                {market.player.name}
              </Badge>
            </div>
          </DrawerHeader>

          <div className="max-h-[60vh] space-y-4 overflow-y-auto px-4 pb-4">
            {/* Market Stats */}
            <Card>
              <CardContent className="space-y-4 p-4">
                <div className="text-center">
                  <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
                    Total Value Locked
                  </div>
                  <div className="flex items-center justify-center text-lg font-bold text-gray-900 dark:text-white">
                    <DollarSign size={16} className="mr-1 text-green-600" />
                    {market.tvl}
                  </div>
                </div>

                {/* Volume Distribution */}
                <div>
                  <div className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
                    Volume Distribution
                  </div>
                  <div className="flex h-10 overflow-hidden rounded-xl bg-gray-100 shadow-inner dark:bg-gray-800">
                    {market.outcomes.map((outcome, index) => (
                      <div
                        key={outcome.id}
                        className={`relative flex items-center justify-center text-sm font-semibold text-white transition-all duration-500 ease-out ${
                          index === 0
                            ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg'
                            : 'bg-gradient-to-r from-rose-400 to-rose-600 shadow-lg'
                        }`}
                        style={{ width: `${outcome.probability}%` }}
                      >
                        <div className="absolute inset-0 bg-white/10 transition-colors hover:bg-white/20" />
                        <span className="relative z-10">
                          {outcome.probability >= 15 &&
                            `${outcome.probability}%`}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between text-xs">
                    {market.outcomes.map((outcome, index) => (
                      <div
                        key={outcome.id}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={`h-4 w-4 rounded-full shadow-sm ${
                            index === 0
                              ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                              : 'bg-gradient-to-r from-rose-400 to-rose-600'
                          }`}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {outcome.label}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            {outcome.probability}% volume
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Outcome Selection */}
            <div>
              <Label className="mb-3 block text-sm font-medium text-gray-900 dark:text-white">
                Select Outcome
              </Label>
              <div className="space-y-2">
                {market.outcomes.map((outcome) => (
                  <Card
                    key={outcome.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedOutcome === outcome.id
                        ? 'bg-primary/5 border-primary ring-2 ring-primary'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedOutcome(outcome.id)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {outcome.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {outcome.probability}% implied probability
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {outcome.odds.toFixed(2)}x
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            odds
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stake Input */}
            {selectedOutcome && (
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                  Stake Amount
                </Label>
                <div className="relative">
                  <DollarSign
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  />
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="pl-10 text-lg font-medium"
                    step="0.01"
                    min="0"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex space-x-2">
                  {['10', '25', '50', '100'].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setStakeAmount(amount)}
                      className="flex-1 text-xs"
                    >
                      ${amount}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Payout Calculation */}
            {selectedOutcome && stakeAmount && parseFloat(stakeAmount) > 0 && (
              <Card className="border-primary/20 from-primary/10 to-primary/5 bg-gradient-to-r">
                <CardContent className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                      <Calculator size={14} className="mr-2" />
                      Potential Payout
                    </span>
                    <span className="text-lg font-bold text-primary">
                      ${potentialPayout}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Potential Profit
                    </span>
                    <span
                      className={`font-medium ${parseFloat(potentialProfit) > 0 ? 'text-green-600' : 'text-gray-600'}`}
                    >
                      ${potentialProfit}
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    Odds: {selectedOutcomeData?.odds.toFixed(2)}x • Stake: $
                    {stakeAmount}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Linked Tournaments */}
            <div>
              <Label className="mb-3 block flex items-center text-sm font-medium text-gray-900 dark:text-white">
                <Trophy size={14} className="mr-2" />
                Related Tournaments ({market.linkedTournaments.length})
              </Label>
              <div className="space-y-2">
                {market.linkedTournaments.map((tournament) => (
                  <Card
                    key={tournament.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center space-x-2">
                            <Badge
                              className={`text-xs ${getTournamentBadgeStyle(tournament.type)}`}
                            >
                              {getTournamentIcon(tournament.type)}
                              <span className="ml-1">{tournament.type}</span>
                            </Badge>
                          </div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {tournament.name}
                          </div>
                          <div className="mt-1 flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <DollarSign size={10} className="mr-1" />
                              {tournament.prize}
                            </span>
                            <span className="flex items-center">
                              <Users size={10} className="mr-1" />
                              {tournament.participants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Place Bet Button */}
            <div className="sticky bottom-0 border-t bg-white pt-4 dark:bg-gray-900">
              <Button
                onClick={handlePlaceBet}
                disabled={
                  !selectedOutcome ||
                  !stakeAmount ||
                  parseFloat(stakeAmount) <= 0
                }
                className="hover:bg-primary/90 w-full bg-primary py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                size="lg"
              >
                {!selectedOutcome ? (
                  'Select an outcome'
                ) : !stakeAmount || parseFloat(stakeAmount) <= 0 ? (
                  'Enter stake amount'
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Place Bet • ${potentialPayout} payout
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

// Sample market data for testing
export const sampleBetMarket: BetMarket = {
  id: 'market-1',
  title: 'LeBron James Next Game Points',
  description:
    'Will LeBron James score over or under 25.5 points in his next game?',
  player: {
    name: 'LeBron James',
    imageUrl: '/api/placeholder/64/64',
    sport: 'Basketball',
  },
  outcomes: [
    {
      id: 'over',
      label: 'Over 25.5 Points',
      odds: 1.85,
      probability: 67,
    },
    {
      id: 'under',
      label: 'Under 25.5 Points',
      odds: 1.95,
      probability: 33,
    },
  ],
  tvl: '$125,430',
  volume24h: '$45,280',
  endDate: '2025-06-20T20:00:00Z',
  linkedTournaments: [
    {
      id: 't1',
      name: 'NBA Elite Championship',
      type: 'PREMIUM',
      prize: '$50,000',
      participants: 1847,
    },
    {
      id: 't2',
      name: 'Basketball Masters',
      type: 'OPEN',
      prize: '$10,000',
      participants: 892,
    },
    {
      id: 't3',
      name: 'VIP Lakers Predictions',
      type: 'PRIVATE',
      prize: '$25,000',
      participants: 45,
    },
  ],
};
