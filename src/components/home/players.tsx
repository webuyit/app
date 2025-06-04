'use client';

import React from 'react';

import Image from 'next/image';

import { Link } from 'next-view-transitions';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { players } from '@/lib/constants';

export default function Players() {
  return (
    <div className="px-2">
      <h3 className="mb-2 text-lg font-semibold">Players</h3>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        loop={true}
        spaceBetween={10}
        slidesPerView="auto"
        className="!overflow-visible"
      >
        {players.map((item, i) => (
          <SwiperSlide
            key={i}
            className="flex !w-[70px] flex-shrink-0 flex-col items-center"
          >
            <div className="h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-yellow-500">
              <Link href={`/players/1`}>
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="h-full w-full rounded-full object-cover"
                />
              </Link>
            </div>
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {item.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
