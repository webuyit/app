'use client';

import React from 'react';

import { usePathname } from 'next/navigation';

import { Link } from 'next-view-transitions';

import { bottomNavbar } from '@/lib/constants';

export default function BottomNav() {
  const pathname = usePathname(); // 🔥 Get current path

  return (
    <div className="fixed bottom-3.5 z-20 flex h-16 w-full items-center justify-center">
      <div className="mx-auto w-[85%] rounded-3xl bg-gray-300 px-1.5 py-1.5 dark:bg-stone-900">
        <div className="flex h-full w-full items-center justify-between rounded-3xl bg-gray-200 px-3 py-2.5 dark:bg-stone-800">
          {bottomNavbar.map((item, i) => {
            const isActive = pathname.startsWith(item.url); // 🔥 Check if current page matches item
            return (
              <Link
                href={`${item.url}`}
                key={i}
                className={`rounded-full p-2 transition-all ${
                  isActive
                    ? 'scale-125 bg-black text-white dark:bg-white dark:text-black'
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
