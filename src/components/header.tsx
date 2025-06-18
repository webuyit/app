'use client';

import { Bell, Trophy, User } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Trophy className="text-white" size={16} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">AthleteBet</h1>
          <p className="text-xs text-gray-500">$2,450.00</p>
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
