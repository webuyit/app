import React from 'react';

import Image from 'next/image';

export default function LeagueCard() {
  return (
    <div className="h-60 w-full rounded-xl border bg-background/15 p-1">
      <Image
        src={`/img/cover.jpeg`}
        width={1500}
        height={500}
        alt="cover"
        className="rounded-t-xl object-cover"
      />
      <div className="h-24 w-full bg-yellow-300"></div>
    </div>
  );
}
