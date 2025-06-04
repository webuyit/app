'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Link } from 'next-view-transitions';

import { bottomNavbar } from '@/lib/constants';

export default function BottomNav() {
  const pathname = usePathname(); // 🔥 Get current path
  return (
    <div className="fixed bottom-0 z-20 mx-auto flex h-16 w-full items-center justify-center md:max-w-md">
      <div className="w-full bg-gray-300 dark:bg-background">
        <div className="flex h-full w-full items-center justify-between rounded-t-3xl border-t bg-gray-200 px-3 py-2.5 dark:bg-black/50">
          {bottomNavbar.map((item, i) => {
            const isActive = pathname.startsWith(item.url); // 🔥 Check if current page matches item
            const isGamePad = item.url === '/games';
            return (
              <Link
                href={`${item.url}`}
                key={i}
                className={`rounded-full p-1 transition-all ${
                  isGamePad
                    ? 'scale-150 bg-black text-white dark:bg-white dark:text-primary'
                    : isActive
                      ? 'scale-105 bg-black text-white dark:bg-white dark:text-black'
                      : 'text-stone-700 dark:text-gray-200'
                }`}
              >
                <item.icon className="h-6 w-6" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
