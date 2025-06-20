'use client';

import { useState } from 'react';

import {
  Clock,
  DollarSign,
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

import InitUserClient from '../initUserClient';

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
    gameTime: '8:00 PM EST',
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
    gameTime: '1:00 PM EST',
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
    gameTime: '2:00 PM EST',
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

export default function MyBets() {
  const [settledFilter, setSettledFilter] = useState('all');

  // Calculate today's profit
  const todaysProfit = mockSettledBets.reduce((total, bet) => {
    return total + parseFloat(bet.profit);
  }, 0);

  // Filter settled bets based on result
  const filteredSettledBets = mockSettledBets.filter((bet) => {
    if (settledFilter === 'all') return true;
    if (settledFilter === 'win') return bet.result === 'WON';
    if (settledFilter === 'lose') return bet.result === 'LOST';
    return true;
  });

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `$${num.toFixed(2)}`;
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
                {mockPremarketBets.length} Active
              </Badge>
            </div>

            {mockPremarketBets.map((bet) => (
              <Card
                key={bet.id}
                className="shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={bet.player.imageUrl}
                        alt={bet.player.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {bet.player.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {bet.player.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {bet.odds}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {bet.player.team} {bet.opponent}
                      </p>
                      <p className="mt-1 flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        {bet.gameTime}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg bg-gray-50 p-3">
                    <div className="mb-1 text-xs text-gray-600">
                      {bet.betType}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {bet.description}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Stake: </span>
                      <span className="font-medium">
                        {formatCurrency(bet.stake)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">To Win: </span>
                      <span className="font-medium text-primary">
                        {formatCurrency(bet.potentialWin)}
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
                {mockLiveBets.length} Live
              </Badge>
            </div>

            {mockLiveBets.map((bet) => (
              <Card
                key={bet.id}
                className="border-l-4 border-l-red-500 shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={bet.player.imageUrl}
                        alt={bet.player.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {bet.player.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {bet.player.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {bet.odds}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{bet.player.team}</p>
                      <p className="text-xs font-medium text-red-600">
                        {bet.timeRemaining}
                      </p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg bg-gray-50 p-3">
                    <div className="mb-1 text-xs text-gray-600">
                      {bet.betType}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {bet.description}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      Current: {bet.currentStatus}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500">Stake: </span>
                      <span className="font-medium">
                        {formatCurrency(bet.stake)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">To Win: </span>
                      <span className="font-medium text-primary">
                        {formatCurrency(bet.potentialWin)}
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
                        className={`text-2xl font-bold ${todaysProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {todaysProfit >= 0 ? '+' : ''}
                        {formatCurrency(todaysProfit)}
                      </span>
                      {todaysProfit >= 0 ? (
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

            {/* Settled Bets List */}
            {filteredSettledBets.map((bet) => (
              <Card
                key={bet.id}
                className="shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={bet.player.imageUrl}
                        alt={bet.player.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-sm">
                        {bet.player.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {bet.player.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${
                              bet.result === 'WON'
                                ? 'border-green-200 bg-green-100 text-green-800'
                                : 'border-red-200 bg-red-100 text-red-800'
                            }`}
                          >
                            {bet.result}
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
                              <BetShareCard bet={bet} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{bet.player.team}</p>
                      <p className="text-xs text-gray-500">{bet.date}</p>
                    </div>
                  </div>

                  <div className="mb-3 rounded-lg bg-gray-50 p-3">
                    <div className="mb-1 text-xs text-gray-600">
                      {bet.betType}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {bet.description}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      Result: {bet.finalStats}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="block text-xs text-gray-500">Stake</span>
                      <span className="font-medium">
                        {formatCurrency(bet.stake)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">
                        Payout
                      </span>
                      <span className="font-medium">
                        {formatCurrency(bet.payout)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">
                        Profit
                      </span>
                      <span
                        className={`font-medium ${
                          bet.result === 'WON'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {bet.profit}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <InitUserClient />
      <BottomNavigation />
    </div>
  );
}
