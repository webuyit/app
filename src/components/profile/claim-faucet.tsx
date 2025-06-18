import React from 'react';

import Image from 'next/image';

import { COIN_URL } from '@/lib/constants';

import { Button } from '../ui/button';

export default function ClaimFaucet() {
  return (
    <div className="flex items-center justify-between rounded-t-3xl bg-primary px-2 py-2">
      <div className="flex gap-2">
        <Image
          src={COIN_URL}
          width={30}
          height={30}
          alt="coin"
          className="h-6 w-6 rounded-full object-cover"
        />
        <div className="h-6 w-[1px] bg-white/75"></div>
        <div>
          <p className="text-lg font-semibold">200</p>
        </div>
      </div>
      <Button size={'sm'} variant={'outline'}>
        Claim
      </Button>
    </div>
  );
}
