'use client';

import React from 'react';

import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
// Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';

import { announcements } from '@/lib/constants';

import { AspectRatio } from '../ui/aspect-ratio';

export default function Announcements() {
  return (
    <div className="mt-[52px] w-full">
      <AspectRatio ratio={15 / 5} className="relative border border-red-400">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="announcement-swiper h-full w-full"
        >
          {announcements.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="h-full w-full">
                <Image
                  src={item.icon}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}

          {/* Pagination overlay */}
          <div className="swiper-pagination absolute !bottom-3 !left-1/2 z-10 !-translate-x-1/2" />
        </Swiper>
      </AspectRatio>
    </div>
  );
}
