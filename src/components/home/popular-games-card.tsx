import React from 'react';

import Image from 'next/image';

import { IconClock, IconDiamond, IconEye } from '@tabler/icons-react';

import { truncateMiddle } from '@/lib/utils';
import { MARKET } from '@/types/types';

import { Button } from '../ui/button';
import Countdown from './countdown';

type Props = {
  data: MARKET;
};
export default function PopularGamesCard(data: Props) {
  const bestOutcome = data.data.outcomes.reduce((prev, current) =>
    current.odds > prev.odds ? current : prev,
  );

  console.log('best outcome', bestOutcome);
  return (
    <div className="space-y-2 rounded-xl border bg-muted/20 p-2 shadow-sm">
      {/* Top section: Player and Club */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative rounded-md border border-green-500/60">
          <Image
            width={40}
            height={40}
            src={data.data.players[0].profilePicture}
            alt="player cover"
            className="h-10 w-10 rounded-md object-cover"
          />
          <div className="absolute right-1 top-[57%]">
            <IconEye className="h-4 w-4 cursor-pointer text-muted-foreground" />
          </div>
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="flex items-center gap-1">
            <p className="max-w-[90px] truncate text-xs text-muted-foreground">
              {truncateMiddle(data.data.title)}
            </p>
            <Image
              src={data.data.players[0].team.logo}
              width={28}
              height={28}
              alt="club"
              className="h-6 w-6 rounded-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex hidden items-center gap-1 text-xs text-muted-foreground">
              <IconDiamond className="h-4 w-4 text-yellow-300" />
              <span className="font-semibold">32.66 M</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <IconClock className="h-4 w-4 text-green-600" />
              <Countdown endTime={data.data.endsAt} />
            </div>
          </div>
        </div>
      </div>

      {/* Best outcome */}
      <div className="flex items-center justify-between">
        <div className="space-y-0">
          <p className="text-sm font-semibold text-secondary-foreground/70">
            x{bestOutcome.odds}
          </p>
          <p className="text-xs text-muted-foreground">{bestOutcome.label}</p>
        </div>
        <Button size="sm" variant={'secondary'}>
          Bet
        </Button>
      </div>
    </div>
  );
}
