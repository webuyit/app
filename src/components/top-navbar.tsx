import React from 'react';

import Image from 'next/image';

import { IconDiamond } from '@tabler/icons-react';

export default function TopNavbar() {
  return (
    <div className="fixed top-0 z-50 h-[50px] w-full border-b bg-background/80 p-2 md:max-w-md">
      <div className="flex items-center justify-between">
        <div>
          <Image
            src={`/img/logo.jpg`}
            width={60}
            height={60}
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
        </div>

        <div>
          <div className="flex items-center">
            <IconDiamond className="h-8 w-8 text-yellow-600" />
            <div className="rounded-r-xl border border-l-0 border-yellow-400/25 pr-1">
              <p className="text-xs">19</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
