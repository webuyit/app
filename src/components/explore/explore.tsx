'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Filter, Search } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';

import { BottomNavigation } from '@/components/bottom-navigation';
import { Header } from '@/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MARKET, PLAYER } from '@/types/types';

const sportCategories = [
  { id: 'all', name: 'All Sports', icon: '🏆' },
  { id: 'basketball', name: 'Basketball', icon: '🏀' },
  { id: 'football', name: 'Football', icon: '🏈' },
  { id: 'baseball', name: 'Baseball', icon: '⚾' },
  { id: 'soccer', name: 'Soccer', icon: '⚽' },
  { id: 'tennis', name: 'Tennis', icon: '🎾' },
  { id: 'hockey', name: 'Hockey', icon: '🏒' },
];

type Props = {
  players: PLAYER[];
  markets: MARKET[];
};
export default function Explore({ players, markets }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useTransitionRouter();
  /* const { data: players = [] } = useQuery({
    queryKey: ['/api/players'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/players');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  const { data: bets = [] } = useQuery({
    queryKey: ['/api/bets/popular'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/bets/popular');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });*/

  // Filter players based on search and category
  const filteredPlayers = (players as PLAYER[]).filter((player: PLAYER) => {
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      player.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Filter bets based on search and category
  const filteredBets = (markets as MARKET[]).filter((bet: MARKET) => {
    const matchesSearch =
      bet.players[0]?.player.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      bet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      bet.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  console.log('Filtered markets', filteredBets);

  const formatTotalLocked = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}K`;
    }
    return `$${num.toFixed(0)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 md:mx-auto md:max-w-md md:border-x md:border-gray-200">
      <Header />

      {/* Search Section */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search players, bets, or sports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl border-gray-300 py-3 pl-10 pr-4 text-base focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      {/* Filter Categories */}
      <div className="border-b border-gray-100 bg-white px-4 py-3">
        <div className="scrollbar-hide flex space-x-2 overflow-x-auto">
          {sportCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'scale-105 bg-primary text-white shadow-md'
                  : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 pb-20">
        {/* Players Section */}
        {filteredPlayers.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Players
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {filteredPlayers.map((player: PLAYER) => (
                <Card
                  key={player.id}
                  className="touch-feedback cursor-pointer transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={player.profilePicture}
                          alt={player.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="text-sm">
                          {player.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')
                            .substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">
                            {player.name}
                          </h3>
                          {player.verified && (
                            <Badge className="bg-primary px-2 py-0.5 text-xs text-white">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            {player.category}
                          </span>
                          {player.team && (
                            <>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-600">
                                {player.team.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="hover:bg-primary/90 bg-primary text-white"
                        onClick={() => router.push(`/players/${player.id}`)}
                      >
                        View Bets
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Bets Section */}
        {filteredBets.length > 0 && (
          <div className="mb-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Available Bets
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {filteredBets.map((bet: MARKET) => (
                <Card
                  key={bet.id}
                  className="touch-feedback cursor-pointer transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={bet.players[0].player.profilePicture}
                            alt={bet.players[0]?.player.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-xs">
                            {bet.players[0]?.player.name
                              ?.split(' ')
                              .map((n: string) => n[0])
                              .join('')
                              .substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {bet.players[0]?.player.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <div className="flex h-4 w-4 items-center justify-center rounded bg-gray-200">
                              <Avatar className="h-4 w-4">
                                <AvatarImage
                                  src={bet.players[0].player?.team.logo}
                                  alt={'T'}
                                  className="object-cover"
                                />
                                <AvatarFallback className="text-xs">
                                  {bet.players[0]?.player.team.name
                                    ?.split(' ')
                                    .map((n: string) => n[0])
                                    .join('')
                                    .substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <span className="text-xs text-gray-500">
                              {bet.players[0]?.player.team.name}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="mb-1 text-xs text-gray-500">
                          Total Locked
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatTotalLocked('2000')}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 rounded-lg bg-gray-50 p-3">
                      <div className="mb-1 text-xs capitalize text-gray-600">
                        {bet.title}
                      </div>
                      <div className="text-sm font-medium capitalize text-gray-900">
                        {bet.description}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Odds:</span>
                        <span className="text-sm font-semibold text-primary">
                          {'1.7'}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        className="hover:bg-primary/90 bg-primary text-white"
                      >
                        Place Bet
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredPlayers.length === 0 && filteredBets.length === 0 && (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No results found
            </h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
