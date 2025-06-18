'use client';

import { useEffect, useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Gift, Star, Trophy } from 'lucide-react';
// Import Swiper styles
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { FAKE_ENDPOINT_FROM_TEST, announcements } from '@/lib/constants';

const iconMap = {
  star: Star,
  trophy: Trophy,
  gift: Gift,
};

export function AnnouncementCarousel() {
  /* const { data: announcements = [] } = useQuery({
    queryKey: [`api/announcements`],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/api/announcements');
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });*/

  if (!announcements.length) {
    return null;
  }

  return (
    <div className="bg-primary-gradient px-4 py-2 text-white">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={800}
        effect="slide"
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={10}
        freeMode={true}
      >
        {announcements.map((announcement: any) => {
          const IconComponent =
            iconMap[announcement.icon as keyof typeof iconMap] || Star;
          return (
            <SwiperSlide key={announcement.id}>
              <div className="flex items-center space-x-2 py-1">
                <IconComponent size={14} />
                <span className="text-sm font-medium">
                  {announcement.content}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
