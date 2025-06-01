'use client';

import React from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '../ui/button';
import Slide from './slide';

/**/

export default function Onboarding() {
  return (
    <div className="flex h-screen w-full flex-col justify-between">
      {/* Slides wrapper */}
      <div className="h-[70vh]">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
            bulletClass: ' custom-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
          }}
        >
          <SwiperSlide>
            <Slide title="First slide" className="h-[70vh] bg-red-500" />
          </SwiperSlide>
          <SwiperSlide>
            <Slide title="Second slide" className="h-[70vh]" />
          </SwiperSlide>
          <SwiperSlide>
            <Slide title="Third slide" className="h-[70vh]" />
          </SwiperSlide>
        </Swiper>

        {/* Custom Pagination */}
        <div className="custom-pagination mt-4 flex justify-center gap-1" />
      </div>

      {/* Fixed bottom section */}
      <div className="flex h-[30vh] flex-col items-center justify-end pb-6">
        <Button size={'xl'} className="w-11/12">
          Get Started
        </Button>
      </div>
    </div>
  );
}
