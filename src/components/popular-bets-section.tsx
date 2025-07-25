'use client';

import { useEffect, useRef } from 'react';

import { Manjari } from 'next/font/google';

import { useQuery, useQueryClient } from '@tanstack/react-query';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { BettingDrawer, sampleBetMarket } from '@/components/betting-drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SERVER_URL } from '@/lib/constants';
import { formatNumberCompact } from '@/lib/format-number-compact';
import { getHighestOdds } from '@/lib/getHighestOdds';
import { truncateMiddle } from '@/lib/utils';
import { MARKET, MARKETS } from '@/types/types';

type MarketsProps = {
  initialMarkets: MARKET[];
};
export function PopularBetsSection({ initialMarkets }: MarketsProps) {
  const { data: response } = useQuery({
    queryKey: [`markets/popular`],
    queryFn: async () => {
      const res = await fetch(`${SERVER_URL}markets/popular?limit=10`);
      return res.json();
    },
    initialData: initialMarkets,
    refetchInterval: 30_000, // every 30 seconds
    refetchOnWindowFocus: false, // don't refetch when switching tabs (unless needed)
    staleTime: 29_000, // prevents too-frequent re-fetching
    refetchIntervalInBackground: false,
  });

  const formatTotalLocked = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return `${num.toFixed(2)}`;
  };

  const markets = response?.markets ?? [];
  console.log('markets from pupular bets section', markets);

  const formatCurrency = (amount: number) => {
    // const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return (
      <div className="flex items-center space-x-0.5">
        <Avatar className="h-3.5 w-3.5">
          <AvatarImage
            src={`/img/coin.png`}
            alt={'coin'}
            className="object-cover"
          />
          <AvatarFallback className="text-xs">$</AvatarFallback>
        </Avatar>
        <span className="font-medium">{formatNumberCompact(amount)}</span>
      </div>
    );
  };

  return (
    <section className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Popular Bets</h2>
        <Button
          variant="ghost"
          className="hidden h-auto p-0 text-sm font-medium text-primary hover:bg-transparent"
        >
          View All
        </Button>
      </div>
      <Swiper
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        scrollbar={{
          el: '.swiper-scrollbar',
          hide: true,
        }}
      >
        {markets?.map((bet: MARKET) => (
          <SwiperSlide key={bet.id} className="swiper-slide !w-72">
            <Card className="touch-feedback cursor-pointer transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={bet.players[0]?.player.profilePicture}
                        alt={bet.players[0]?.player.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-xs">
                        {bet.players[0]?.player?.name
                          ?.split(' ')
                          .map((n: string) => n[0])
                          .join('')
                          .substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {bet.players[0]?.player?.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <div className="flex h-4 w-4 items-center justify-center rounded bg-gray-200">
                          <div className="text-xs font-bold text-gray-600">
                            <Avatar className="h-5 w-5">
                              <AvatarImage
                                src={bet.players[0]?.player.team.logo}
                                alt={bet.players[0]?.player.team.name}
                                className="object-cover"
                              />
                              <AvatarFallback className="text-xs">
                                {bet.players[0]?.player?.team.name
                                  ?.split(' ')
                                  .map((n: string) => n[0])
                                  .join('')
                                  .substring(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {bet.players[0]?.player?.team?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 text-xs text-gray-500">
                      Total Locked
                    </div>
                    {formatCurrency(bet.totalPools)}
                  </div>
                </div>
                <div className="mb-3 rounded-lg bg-gray-50 p-3">
                  <div className="mb-1 text-xs capitalize text-gray-600">
                    {bet.marketCategory || 'Goals Count over/under'}
                  </div>
                  <div className="text-sm font-medium capitalize text-gray-900">
                    {truncateMiddle(bet.title, 25, 6, 31)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Odds:</span>
                    <span className="text-sm font-semibold text-primary">
                      {getHighestOdds(bet.outcomes)}x
                    </span>
                  </div>
                  <BettingDrawer
                    market={{
                      ...sampleBetMarket,
                      id: `market-${bet.id}`,
                      title: bet.marketCategory || 'Goals count over/under',
                      description: bet.title,
                      player: {
                        name: bet.players[0].player?.name || 'Unknown Player',
                        imageUrl:
                          bet.players[0]?.player?.profilePicture ||
                          '/api/placeholder/64/64',
                        sport: bet.players[0]?.player?.category || 'Sports',
                      },
                      tvl: formatTotalLocked(bet.totalPools.toString()),

                      /*outcomes: [
                        {
                          id: 'yes',
                          label: 'Yes',
                          odds: parseFloat('2.3') || 1.5,
                          probability: 60,
                        },
                        {
                          id: 'no',
                          label: 'No',
                          odds: 2.2,
                          probability: 40,
                        },
                      ],*/
                      outcomes: bet.outcomes,
                    }}
                    trigger={
                      <Button
                        size="sm"
                        className="hover:bg-primary/90 bg-primary text-white"
                      >
                        Place Bet
                      </Button>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
