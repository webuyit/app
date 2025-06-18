import React from 'react';

import Image from 'next/image';

import {
  IconArrowDownLeft,
  IconArrowUpRight,
  IconEye,
  IconListDetails,
} from '@tabler/icons-react';

import { CHILIZ_LOGO, COIN_URL } from '@/lib/constants';

import { Button } from '../ui/button';

export default function Balance() {
  return (
    <div className="space-y-8 px-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col px-3">
          <div className="flex items-center gap-1">
            <h5 className="text-sm">Total Balance</h5>
            <IconEye className="h-5 w-5" />
          </div>
          <div className="w-28">
            <div className="flex items-center gap-1">
              <Image
                src={COIN_URL}
                width={30}
                height={30}
                alt="coing"
                className="h-6 w-6 rounded-full object-cover"
              />
              <p className="text-2xl font-bold">102.98</p>
            </div>
            <div className="flex w-full items-center justify-end">
              <p className="text-sm text-muted-foreground">
                =97.6 <span>USD</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <div className="flex items-center gap-1">
            <h5 className="text-sm">Total Balance</h5>
            <IconEye className="h-5 w-5" />
          </div>
          <div className="w-28">
            <div className="flex items-center gap-1">
              <Image
                src={CHILIZ_LOGO}
                width={30}
                height={30}
                alt="coing"
                className="h-6 w-6 rounded-full object-cover"
              />
              <p className="text-2xl font-bold">702.98</p>
            </div>
            <div className="flex w-full items-center justify-end">
              <p className="text-sm text-muted-foreground">
                =207.6 <span>USD</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center justify-center space-y-1">
          <Button size={'icon'} variant={'outline'} className="">
            <IconArrowDownLeft />
          </Button>
          <p className="text-xs text-muted-foreground">Deposit</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <Button
            size={'icon'}
            variant={'outline'}
            className=""
            disabled={true}
          >
            <IconArrowUpRight />
          </Button>
          <p className="text-xs text-muted-foreground">Withdraw</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <Button size={'icon'} variant={'outline'} className="">
            <IconListDetails />
          </Button>
          <p className="text-xs text-muted-foreground">Transactions</p>
        </div>
      </div>
    </div>
  );
}
