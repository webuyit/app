import React from 'react';

import Image from 'next/image';

import { COIN_URL } from '@/lib/constants';

type Props = {
  tvl: number;
  showSymbol?: boolean;
  className?: string;
};
export default function CardTvlNumber({ tvl, showSymbol, className }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Image src={COIN_URL} width={30} height={30} alt="coin" className="" />
      <p className={`${className}`}>{tvl}</p>
    </div>
  );
}
