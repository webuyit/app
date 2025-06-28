'use client';

import React from 'react';

import { MoveLeft } from 'lucide-react';
import { useTransitionRouter } from 'next-view-transitions';

import { Button } from '../ui/button';

export default function LearnTopNavbar() {
  const router = useTransitionRouter();
  return (
    <div className="sticky top-0 z-10 mb-3 flex h-[60px] w-full items-center justify-between border border-b bg-white/95 px-3">
      <Button size={'icon'} variant={'outline'} onClick={() => router.back()}>
        <MoveLeft />{' '}
      </Button>
      <div>
        <p className="text-xl font-semibold">Learn </p>
      </div>
      <div></div>
    </div>
  );
}
