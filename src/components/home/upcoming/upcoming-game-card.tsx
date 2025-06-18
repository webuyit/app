'use client';

import React from 'react';

import Image from 'next/image';

import {
  IconBallBasketball,
  IconBallTennis,
  IconBasketBolt,
  IconChevronUp,
  IconChevronsDown,
  IconChevronsUp,
  IconClock,
  IconDiamond,
  IconEye,
} from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { truncateMiddle } from '@/lib/utils';
import { MARKET } from '@/types/types';

import Countdown from '../countdown';

type Props = {
  data: MARKET;
};
export default function UpcomingGameCard(data: Props) {
  const bestOutcome = data.data.outcomes.reduce((prev, current) =>
    current.odds > prev.odds ? current : prev,
  );

  console.log('Upcoming card data', data);
  const cardHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
          {data.data.category === 'FOOTBALL' ? (
            <IconBallBasketball className="h-4 w-4 text-white" />
          ) : (
            <IconBallTennis className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="bg-blue-600 px-1 py-0.5 text-xs font-semibold text-white">
          {data.data.category}
        </div>
      </div>
    );
  };
  return (
    <div className="border-lime-primary w-48 overflow-hidden rounded-3xl border-2 bg-black/95 p-2 shadow-2xl backdrop-blur-md">
      {/* CARD HEADER */}
      <div>{cardHeader()}</div>
      {/* CARD BODY */}

      <div className="relative mb-2 mt-3 h-36 overflow-hidden rounded-2xl border border-red-700">
        <Image
          src={`/img/player-1.webp`}
          alt={data.data.title}
          className="h-full w-full object-cover"
          width={300}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute left-1 top-3">
          <Image
            src={`/img/club.svg`}
            width={30}
            height={30}
            alt={`team logo`}
            className="h-9 w-9 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-1 text-sm font-medium text-white">
            {data.data.match.teamA.name}
          </div>
          <div className="text-xs text-gray-300">
            vs {data.data.match.teamB.name}
          </div>
        </div>
      </div>

      {/*CARD FOOTER */}
      <div className="w-full text-center">
        <h3 className="mb-2 text-xl font-black tracking-wider text-white">
          Haaland
        </h3>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-1">
            <IconClock className="h-4 w-4 text-muted-foreground" />
            <Countdown
              endTime={data.data.endsAt}
              className="text-lime-primary inline-block text-xs font-semibold"
            />
          </div>
          <Button size={'sm'} className="h-6">
            Bet
          </Button>
        </div>
      </div>
    </div>
  );
}
