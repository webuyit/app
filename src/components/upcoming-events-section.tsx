'use client';

import { useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Clock, Flame, Star, Trophy, Users } from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';
// Import Swiper styles
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MARKET } from '@/types/types';

type Props = {
  events: MARKET[];
};
export function UpcomingEventsSection({ events }: Props) {
  /* const { data: events = [] } = useQuery({
    queryKey: ['/api/events/upcoming'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/events/upcoming');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });*/
  console.log('Events', events[0].Match);
  const formatBettorsCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <section className="px-4 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
        <Link href="/events">
          <Button
            variant="ghost"
            className="h-auto p-0 text-sm font-medium text-primary hover:bg-transparent"
          >
            View All
          </Button>
        </Link>
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
        {events.map((event: MARKET) => (
          <SwiperSlide key={event.id} className="swiper-slide !w-64">
            <Card className="touch-feedback cursor-pointer overflow-hidden transition-shadow hover:shadow-md">
              <div className="relative">
                <img
                  src={
                    event?.coverUrl || event.players[0]?.player.profilePicture
                  }
                  alt={event.title}
                  className="h-32 w-full object-cover"
                />
                <div className="absolute left-2 top-2 flex items-center space-x-1 rounded-full bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                  <Clock size={10} />
                  <span>{'1d 4h'}</span>
                </div>
                {event.status === 'LIVE' && (
                  <Badge className="absolute right-2 top-2 animate-pulse bg-red-500 px-2 py-1 text-xs text-white">
                    LIVE
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="mb-1 text-sm font-semibold capitalize text-gray-900">
                  {event.players[0].player.name}
                </h3>
                <p className="mb-2 truncate text-xs capitalize text-gray-600">
                  {event.Match.title}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {event.isHot && (
                      <div className="flex items-center space-x-1">
                        <Flame className="text-orange-500" size={12} />
                        <span className="text-xs text-gray-600">Hot</span>
                      </div>
                    )}
                    {event.isFeatured && (
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-500" size={12} />
                        <span className="text-xs text-gray-600">Featured</span>
                      </div>
                    )}
                    {!event.isHot && !event.isFeatured && (
                      <div className="flex items-center space-x-1">
                        <Trophy className="text-yellow-500" size={12} />
                        <span className="text-xs text-gray-600">Final</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Users className="text-gray-400" size={12} />
                      <span className="text-xs text-gray-600">
                        {formatBettorsCount(200)}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="hover:bg-primary/90 bg-primary px-3 py-1.5 text-xs text-white"
                  >
                    Bet Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
