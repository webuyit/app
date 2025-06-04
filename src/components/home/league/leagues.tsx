'use client';

import React from 'react';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { popularBets } from '@/lib/constants';

import LeagueCard from './league-card';

export default function Leagues() {
  return (
    <div className="px-2">
      <h3 className="mb-3 text-lg font-semibold">Tournaments</h3>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500 }}
        loop={true}
        spaceBetween={12}
        slidesPerView={1}
        className="!overflow-visible"
      >
        {popularBets.map((item, i) => {
          return (
            <SwiperSlide key={i} className="">
              <LeagueCard />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
