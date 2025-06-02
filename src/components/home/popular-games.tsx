'use client';

import React from 'react';

import Image from 'next/image';

import { IconClock } from '@tabler/icons-react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { popularBets } from '@/lib/constants';
import { truncateMiddle } from '@/lib/utils';

import { Button } from '../ui/button';

export default function Popular() {
  return (
    <div className="px-2">
      <h3 className="mb-2 text-lg font-semibold">Popular Bets</h3>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        loop={true}
        spaceBetween={10}
        slidesPerView="auto"
        className="!overflow-visible"
      >
        {popularBets.map((item, i) => (
          <SwiperSlide
            key={i}
            className="flex !w-[170px] flex-shrink-0 flex-col items-center"
          >
            <div className="space-y-3 rounded-xl border bg-muted p-1">
              <div className="flex items-center justify-between">
                <div>
                  <Image
                    width={60}
                    height={60}
                    src={item.player}
                    alt="player cover"
                    className="h-[40px] w-[40px] rounded-md border border-purple-400 object-cover"
                  />
                </div>

                <div className="bg-red-700">
                  <div className="flex items-center">
                    <p className="truncate text-ellipsis text-xs text-muted-foreground">
                      {truncateMiddle(item.title)}
                    </p>
                    <div>
                      <Image
                        src={item.clubLogo}
                        width={60}
                        height={60}
                        alt="club"
                        className="h-7 w-7 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <IconClock className="h-4 w-4" />
                    <p className="text-sm font-semibold">4646</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>{item.odds}</p>
                <Button>Bet</Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
