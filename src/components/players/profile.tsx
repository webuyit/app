import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import Games from './games';
import { ChartTooltipDefault } from './perfomace-twot';
import { Perfomance } from './perfomance';
import PlayerDetails from './player-details';

export default function Prrofile() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="mb-16 h-28 w-full bg-red-600"></div>
        <div className="absolute top-[70%] mb-24 flex w-full items-center justify-center">
          <div className="flex w-full items-center justify-between">
            <div>
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>

            {/* RIGHT  actions */}
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <PlayerDetails />
      <Perfomance />
      <Games />
    </div>
  );
}
