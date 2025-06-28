'use client';

import React from 'react';

import Image from 'next/image';

import { Link } from 'next-view-transitions';

import { tutorials } from '@/lib/constants';

export default function Learn() {
  return (
    <div className="p-2">
      {/* contents to learn */}

      <div className="flex flex-col space-y-6">
        {tutorials.map((item, i) => (
          <Link key={i} href={item.href} className="w-full">
            <div className="flex items-center justify-between rounded-xl border p-4">
              <p className="text-lg font-medium">{item.title}</p>
              <Image
                src={item.cover}
                width={200}
                height={200}
                alt="cover"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
