'use client';

import React from 'react';

import Image from 'next/image';

import {
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

  console.log('best outcome', bestOutcome);
  return (
    <div className="space-y-2 rounded-xl border bg-muted/20 shadow-sm">
      <div className="relative rounded-xl border border-emerald-400/5 p-1">
        <Image
          src={data.data.players[0].profilePicture}
          width={1000}
          height={600}
          alt="cover"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/20 p-2 text-white opacity-100">
          <div className="absolute flex items-start justify-start">
            <Image
              src={data.data.players[0].team.logo}
              width={60}
              height={60}
              alt="team"
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>

          {/* card body */}

          <div className="flex h-full w-full flex-col items-center justify-end rounded-md bg-gradient-to-b from-black/15 to-red-700/30 p-0.5">
            <div className="flex w-full flex-col items-center justify-center space-y-1">
              <div className="flex flex-col items-center justify-center">
                <p className="-mb-1 text-sm">
                  {' '}
                  {truncateMiddle(data.data.title, 10, 5, 30)}
                </p>
                <Countdown
                  endTime={data.data.endsAt}
                  className="font-serif text-sm text-primary-foreground"
                />
              </div>
              <div>
                <p className="font-mono text-2xl">
                  {data.data.players[0].name}
                </p>
              </div>
              <div>
                <p className="text-center text-xs">
                  TVL: <span className="font-semibold text-primary">378</span>
                </p>
              </div>
            </div>
            {/* CARD FOOTER WITH GAME STATS */}

            <div className="flex w-full items-center justify-between">
              {data.data.outcomes.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 rounded-md border p-0.5"
                >
                  <div>
                    {item.label === 'Yes' ? (
                      <IconChevronsUp className="h-5 w-5" />
                    ) : (
                      <IconChevronsDown className="h-5 w-5" />
                    )}
                  </div>
                  <p className="justify-center text-center text-xs text-muted-foreground">
                    x{item.odds}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
