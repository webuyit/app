'use client';

import React from 'react';

import { useCountdown } from '@/lib/useCountDown';

export default function Countdown({
  endTime,
  className,
}: {
  endTime: Date;
  className?: string;
}) {
  const { formatted, isEnded } = useCountdown(endTime);

  console.log('endtime', endTime);

  if (isEnded) return <span className="text-red-500">Ended</span>;
  return (
    <div>
      <span className={` ${className}`}>{formatted}</span>
    </div>
  );
}
