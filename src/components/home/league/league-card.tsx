import React from 'react';

import Image from 'next/image';

import { TOURNAMENT } from '@/types/types';

type Props = {
  data: TOURNAMENT;
};
export default function LeagueCard({ data }: Props) {
  return (
    <div className="relative h-56 w-full rounded-xl border bg-background/15 bg-muted p-1">
      <Image
        src={`/img/cover.jpeg`}
        width={1500}
        height={500}
        alt="cover"
        className="rounded-t-xl object-cover"
      />
      <div className="absolute left-0 top-[52%] h-24 w-full rounded-xl border border-yellow-500"></div>
    </div>
  );
}
