'use client';

import Image from 'next/image';

import { Bell, Trophy, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { COIN_URL } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-1.5">
        <Image
          src={`/img/logo.png`}
          width={40}
          height={40}
          alt="logo"
          className="h-8 w-8 rounded-full"
        />
        <div>
          <h1 className="font-semibold text-gray-900">GOAT</h1>
          <div className="flex items-center gap-0.5">
            <Image
              src={`/img/coin.png`}
              width={15}
              height={15}
              alt="currency"
              className=""
            />
            <p className="text-xs text-muted-foreground">2,450.00</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-400 hover:text-gray-600"
        >
          <Bell size={18} />
          <span className="absolute -right-1 -top-0 h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-600"
        >
          <User size={18} />
        </Button>
      </div>
    </header>
  );
}
