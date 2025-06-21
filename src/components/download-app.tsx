'use client';

import React, { useEffect, useState } from 'react';

import { Download, QrCode, Smartphone, Sparkles, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import PWAInstallButton from './onboarding/pwa-install-button';

const DownloadScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownloadClick = () => {
    if (isMobile) {
      // On mobile, trigger PWA install or redirect to app
      console.log('Mobile download triggered');
    } else {
      // On desktop, show modal
      setShowModal(true);
    }
  };

  // Mock app screen data
  const appScreens = [
    {
      id: 1,
      title: 'Not the Match. The Man',
      image: '/img/01.png',
      description: 'Bet on player stats, not just game scores',
    },
    {
      id: 2,
      title: 'Your Squad vs The World',
      image: '/img/02.png',
      description: 'Invite friends or face the public. Every pick counts.',
    },
    {
      id: 3,
      title: 'Back Your Prediction',
      image: '/img/03.png',
      description: 'Yes or No — GOATs don’t hesitate.',
    },
    {
      id: 4,
      title: 'Only the Invited Compete.',
      image: '/img/04.png',
      description: 'Challenge your inner circle. No outsiders. No excuses.',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      {/* Header Section */}
      <div className="mb-12 animate-fade-in space-y-6 text-center">
        {/* Download Button */}
        <Button
          onClick={handleDownloadClick}
          className="hover:from-primary/45 to-primary/90 group hidden h-16 transform rounded-2xl from-primary px-12 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:to-primary hover:shadow-2xl active:scale-95"
        >
          <Download className="mr-3 h-6 w-6 group-hover:animate-bounce" />
          Download App
          <Star className="ml-3 h-5 w-5 group-hover:animate-spin" />
        </Button>
      </div>
      <PWAInstallButton />

      {/* App Screens Carousel */}
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl">
            See What&apos;s Inside
          </h2>
          <p className="text-gray-600">Swipe through our beautiful interface</p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView="auto"
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-primary/30',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary',
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
            className="!pb-12"
          >
            {appScreens.map((screen) => (
              <SwiperSlide key={screen.id} className="!w-80">
                <Card className="hover:shadow-3xl group transform overflow-hidden rounded-3xl border-0 bg-white/95 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-105">
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="mb-1 text-lg font-bold">{screen.title}</h3>
                      <p className="text-sm opacity-90">{screen.description}</p>
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default DownloadScreen;
