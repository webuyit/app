'use client';

import React from 'react';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { popularBets } from '@/lib/constants';

import UpcomingGameCard from './upcoming-game-card';

export default function UpcomingGames() {
  return (
    <div className="px-2">
      <h3 className="mb-3 text-lg font-semibold">Upcoming</h3>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        loop={true}
        spaceBetween={12}
        slidesPerView="auto"
        className="!overflow-visible"
      >
        {popularBets.map((item, i) => {
          return (
            <SwiperSlide
              key={i}
              className="flex !w-[190px] flex-col items-center"
            >
              <UpcomingGameCard data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
