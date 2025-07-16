'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import {
  Clock,
  DollarSign,
  Search,
  Share2,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
} from 'lucide-react';

import { BetShareCard } from '@/components/bet-share-card';
import { BottomNavigation } from '@/components/bottom-navigation';
import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SERVER_URL } from '@/lib/constants';
import { formatToESTTime, formatToRelativeShort } from '@/lib/format-dates';
import { formatNumberCompact } from '@/lib/format-number-compact';
import { calculateProfit } from '@/lib/odds-calculator';
import { BET, UserBets } from '@/types/types';

import { PreMarketBetShareCard } from '../pre-market-bet-share';

// Mock data for bets
const mockPremarketBets = [
  {
    id: 1,
    player: {
      name: 'LeBron James',
      team: 'Lakers',
      imageUrl:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Points Over/Under',
    description: 'Over 25.5 Points',
    odds: '+150',
    stake: '50.00',
    potentialWin: '125.00',
    date: 'Today, 8:00 PM',
    gameTime: '8:00 PM EST',
    oppenent: 'vs Warriors',
    opponent: 'vs Warriors',
  },
  {
    id: 2,
    player: {
      name: 'Tom Brady',
      team: 'Bucs',
      imageUrl:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Passing Yards',
    description: 'Over 285.5 Yards',
    odds: '+125',
    stake: '75.00',
    potentialWin: '168.75',
    date: 'Today, 1:00 PM',
    gameTime: '1:00 PM EST',
    oppenent: 'vs Saints',
    opponent: 'vs Saints',
  },
  {
    id: 3,
    player: {
      name: 'Serena Williams',
      team: 'Individual',
      imageUrl:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Match Winner',
    description: 'Win in Straight Sets',
    odds: '+200',
    stake: '25.00',
    potentialWin: '75.00',
    date: 'Today, 2:00 PM',
    gameTime: '2:00 PM EST',
    oppenent: 'vs Osaka',
    opponent: 'vs Osaka',
  },
];

const mockLiveBets = [
  {
    id: 4,
    player: {
      name: 'Cristiano Ronaldo',
      team: 'Man United',
      imageUrl:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Goals Scored',
    description: 'Over 1.5 Goals',
    odds: '+180',
    stake: '100.00',
    potentialWin: '280.00',
    currentStatus: '0 Goals (15th min)',
    timeRemaining: '75 min remaining',
  },
  {
    id: 5,
    player: {
      name: 'Mike Trout',
      team: 'Angels',
      imageUrl:
        'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Hits',
    description: 'Over 2.5 Hits',
    odds: '+140',
    stake: '60.00',
    potentialWin: '144.00',
    currentStatus: '1 Hit (4th inning)',
    timeRemaining: '5 innings remaining',
  },
];

const mockSettledBets = [
  {
    id: 6,
    player: {
      name: 'LeBron James',
      team: 'Lakers',
      imageUrl:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Points',
    description: 'Over 24.5 Points',
    odds: '+120',
    stake: '50.00',
    payout: '110.00',
    result: 'WON',
    finalStats: '32 Points',
    profit: '+60.00',
    date: 'Today, 11:30 PM',
  },
  {
    id: 7,
    player: {
      name: 'Tom Brady',
      team: 'Bucs',
      imageUrl:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Passing Yards',
    description: 'Over 300.5 Yards',
    odds: '+110',
    stake: '75.00',
    payout: '0.00',
    result: 'LOST',
    finalStats: '287 Yards',
    profit: '-75.00',
    date: 'Today, 8:45 PM',
  },
  {
    id: 8,
    player: {
      name: 'Serena Williams',
      team: 'Individual',
      imageUrl:
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Match Winner',
    description: 'Win Match',
    odds: '+150',
    stake: '40.00',
    payout: '100.00',
    result: 'WON',
    finalStats: '6-4, 6-3',
    profit: '+60.00',
    date: 'Today, 6:20 PM',
  },
  {
    id: 9,
    player: {
      name: 'Connor McDavid',
      team: 'Oilers',
      imageUrl:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=faces',
    },
    betType: 'Goals + Assists',
    description: 'Over 1.5 Points',
    odds: '+130',
    stake: '30.00',
    payout: '0.00',
    result: 'LOST',
    finalStats: '1 Goal, 0 Assists',
    profit: '-30.00',
    date: 'Today, 4:15 PM',
  },
];

type Props = {
  liveBets: BET[];
  openBets: BET[];
  settledBets: BET[];
  allBets: UserBets;
  profitToday: {
    amount: string;
    isPositive: boolean;
  };
};
type Props2 = {
  initialliveBets: BET[];
  initialopenBets: BET[];
  initialsettledBets: BET[];
  profitToday: {
    amount: string;

    isPositive: boolean;
  };
};
export default function MyBets({
  //liveBets,
  //openBets,
  //settledBets,
  //profitToday,
  allBets,
}: Props) {
  const [settledFilter, setSettledFilter] = useState('all');

  const params = useParams();
  const userId = params.userId as string;

  // Calculate today's profit
  const todaysProfit = mockSettledBets.reduce((total, bet) => {
    return total + parseFloat(bet.profit);
  }, 0);

  const { data: response } = useQuery<UserBets>({
    queryKey: [`bets`],
    queryFn: async () => {
      const res = await fetch(`${SERVER_URL}bets/user?userId=${userId}`);
      return res.json();
    },
    initialData: allBets,
    refetchInterval: 80_000, // every 30 seconds
    refetchOnWindowFocus: false, // don't refetch when switching tabs (unless needed)
    staleTime: 99_000, // prevents too-frequent re-fetching
    refetchIntervalInBackground: false,
  });

  const settledBets = response.settledBets;
  const openBets = response.openBets;
  const liveBets = response.liveBets;
  const profitToday = response.profitToday;

  // Filter settled bets based on result
  const filteredSettledBets = settledBets.filter((bet) => {
    if (settledFilter === 'all') return true;
    if (settledFilter === 'win') return bet.status === 'WON';
    if (settledFilter === 'lose') return bet.status === 'LOST';
    return true;
  });

  const formatCurrency2 = (amount: number) => {
    const num = parseFloat(amount.toString());
    return num.toFixed(2);
  };
  const formatCurrency = (bet: BET) => {
    // const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return (
      <div className="flex items-center space-x-0.5">
        <Avatar className="h-3.5 w-3.5">
          <AvatarImage
            src={`/img/coin.png`}
            alt={'coin'}
            className="object-cover"
          />
          <AvatarFallback className="text-xs">
            {bet.outcome.market.players[0]?.player?.name
              ?.split(' ')
              .map((n: string) => n[0])
              .join('')
              .substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">
          {formatCurrency2(bet.potentialPayout)}
        </span>
      </div>
    );
  };

  const formatStake = (bet: BET) => {
    // const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return (
      <div className="flex items-center space-x-0.5">
        <Avatar className="h-3.5 w-3.5">
          <AvatarImage
            src={`/img/coin.png`}
            alt={'coin'}
            className="object-cover"
          />
          <AvatarFallback className="text-xs">
            {bet.outcome.market.players[0]?.player?.name
              ?.split(' ')
              .map((n: string) => n[0])
              .join('')
              .substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{formatCurrency2(bet.amount)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 md:mx-auto md:max-w-md md:border-x md:border-gray-200">
      <Header />

      <div className="px-4 py-4 pb-20">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">My Bets</h1>
          <p className="text-sm text-gray-600">
            Track your betting activity and performance
          </p>
        </div>

        <Tabs defaultValue="premarket" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="premarket" className="text-xs sm:text-sm">
              Premarket
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs sm:text-sm">
              Live
            </TabsTrigger>
            <TabsTrigger value="settled" className="text-xs sm:text-sm">
              Settled
            </TabsTrigger>
          </TabsList>

          {/* Premarket Tab */}
          <TabsContent value="premarket" className="space-y-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Upcoming Bets
              </h2>
              <Badge variant="outline" className="border-primary text-primary">
                {openBets.length} Active
              </Badge>
            </div>

            {/* Empty State */}
            {openBets.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No Bets found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}

            {openBets?.map((bet: BET) => (
              <Card
                key={bet.id}
                className="shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          bet.outcome?.market?.players[0]?.player.profilePicture
                        }
                        alt={bet.outcome?.market?.players[0]?.player.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {bet.outcome?.market?.players[0]?.player.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold capitalize text-gray-900">
                          {bet.outcome?.market?.players[0]?.player.name}
                        </h3>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {bet.oddsAtBet}x
                          </Badge>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
                              >
                                <Share2 size={14} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Share Your Bet Result</DialogTitle>
                              </DialogHeader>

                              <PreMarketBetShareCard bet={bet} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm capitalize text-gray-600">
                        {bet?.outcome?.market?.Match?.title}
                      </p>
                      <p className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {formatToESTTime(bet.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg bg-gray-50 p-3">
                    <div className="mb-1 text-xs capitalize text-gray-600">
                      {bet?.outcome?.market?.marketCategory}
                    </div>
                    <div className="text-sm font-medium capitalize text-gray-900">
                      {bet?.outcome?.market?.title}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Stake: </span>

                      {formatStake(bet)}
                    </div>
                    <div>
                      <span className="text-gray-500">To Win: </span>
                      <span className="font-medium text-primary">
                        {formatCurrency(bet)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Live Tab */}
          <TabsContent value="live" className="space-y-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Live Bets</h2>
              <Badge className="animate-pulse bg-red-500 text-white">
                {liveBets.length} Live
              </Badge>
            </div>

            {/* Empty State */}
            {liveBets.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No Bets found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
            {liveBets.map((bet: BET) => (
              <Card
                key={bet.id}
                className="border-l-4 border-l-red-500 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          bet.outcome.market.players[0].player.profilePicture
                        }
                        alt={bet.outcome.market.players[0].player.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {bet.outcome.market.players[0].player.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold capitalize text-gray-900">
                          {bet.outcome.market.players[0].player.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {bet.oddsAtBet}
                        </Badge>
                      </div>
                      <p className="text-sm capitalize text-gray-600">
                        {bet.outcome.market.players[0].player.team.name}
                      </p>
                      <p className="text-xs font-medium text-red-600">
                        {formatToRelativeShort(bet.outcome.market.endsAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg bg-gray-50 p-3">
                    <div className="mb-1 text-xs text-gray-600">
                      {bet.outcome.market.title}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {bet.outcome.market.description}
                    </div>
                    <div className="mt-1 hidden text-xs text-gray-600">
                      Current: 0
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Stake: </span>
                      <span className="font-medium">{bet.amount}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">To Win: </span>
                      <span className="font-medium text-primary">
                        {formatCurrency(bet)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Settled Tab */}
          <TabsContent value="settled" className="space-y-4">
            {/* Today's Profit Card */}
            <Card
              className={`shadow-sm ${todaysProfit >= 0 ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="mb-1 text-sm text-gray-600">
                      Today&apos;s Profit
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-2xl font-bold ${profitToday.isPositive ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {profitToday.amount}
                      </span>
                      {profitToday.isPositive ? (
                        <TrendingUp className="text-green-600" size={20} />
                      ) : (
                        <TrendingDown className="text-red-600" size={20} />
                      )}
                    </div>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      todaysProfit >= 0 ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    <DollarSign
                      className={`${todaysProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      size={24}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Buttons */}
            <div className="mb-4 flex space-x-2">
              <Button
                variant={settledFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettledFilter('all')}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={settledFilter === 'win' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettledFilter('win')}
                className="flex-1"
              >
                Win
              </Button>
              <Button
                variant={settledFilter === 'lose' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSettledFilter('lose')}
                className="flex-1"
              >
                Lose
              </Button>
            </div>

            {/* Empty State */}
            {filteredSettledBets.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Search className="text-gray-400" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No Bets found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
            {/* Settled Bets List */}
            {filteredSettledBets &&
              filteredSettledBets?.map((bet: BET) => (
                <Card
                  key={bet.id}
                  className="shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={
                            bet.outcome?.market?.players[0]?.player
                              .profilePicture
                          }
                          alt={bet.outcome?.market?.players[0]?.player.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm">
                          {bet.outcome?.market?.players[0]?.player.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold capitalize text-gray-900">
                            {bet.outcome.market?.players[0]?.player.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`${
                                bet.status === 'WON'
                                  ? 'border-green-200 bg-green-100 text-green-800'
                                  : 'border-red-200 bg-red-100 text-red-800'
                              }`}
                            >
                              {bet.status}
                            </Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
                                >
                                  <Share2 size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>
                                    Share Your Bet Result
                                  </DialogTitle>
                                </DialogHeader>
                                <BetShareCard bet={bet} />
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <p className="text-sm capitalize text-gray-600">
                          {bet.outcome.market?.players[0]?.player.team.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatToESTTime(bet.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3 rounded-lg bg-gray-50 p-3">
                      <div className="mb-1 text-xs capitalize text-gray-600">
                        {bet?.outcome.market?.title}
                      </div>
                      <div className="text-sm font-medium capitalize text-gray-900">
                        {bet?.outcome?.market?.title}
                      </div>
                      <div className="mt-1 text-xs capitalize text-gray-600">
                        Result: {bet.outcome.market.result || '5 Points'}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="block text-xs text-gray-500">
                          Stake
                        </span>
                        <span className="font-medium">{formatStake(bet)}</span>
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">
                          Payout
                        </span>
                        <span className="font-medium">
                          {formatCurrency(bet)}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xs text-gray-500">
                          Profit
                        </span>
                        <span
                          className={`font-medium ${
                            bet.status === 'WON'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {bet.status === 'WON'
                            ? `+${calculateProfit(bet.amount, bet.oddsAtBet)}`
                            : `-${calculateProfit(bet.amount, bet.oddsAtBet)}`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>
      <BottomNavigation />
    </div>
  );
}
