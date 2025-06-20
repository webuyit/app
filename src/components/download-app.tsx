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
      title: 'Calendar View',
      image: '/lovable-uploads/5ea5e30e-1175-44a9-90f8-d5bba68f9956.png',
      description: 'Smart scheduling at your fingertips',
    },
    {
      id: 2,
      title: 'Dashboard',
      image: '/lovable-uploads/5ea5e30e-1175-44a9-90f8-d5bba68f9956.png',
      description: 'All your data in one place',
    },
    {
      id: 3,
      title: 'Analytics',
      image: '/lovable-uploads/5ea5e30e-1175-44a9-90f8-d5bba68f9956.png',
      description: 'Insights that matter',
    },
    {
      id: 4,
      title: 'Settings',
      image: '/lovable-uploads/5ea5e30e-1175-44a9-90f8-d5bba68f9956.png',
      description: 'Personalize your experience',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      {/* Header Section */}
      <div className="animate-fade-in mb-12 space-y-6 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="to-primary/90 animate-pulse-lime flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary shadow-lg">
            <Smartphone className="h-8 w-8 text-white" />
          </div>
          <Sparkles className="h-8 w-8 animate-pulse text-primary" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Experience
            <span className="to-primary/95 bg-gradient-to-r from-primary bg-clip-text text-transparent">
              {' '}
              GOATs
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Smart scheduling powered by AI. Transform your productivity with our
            premium mobile experience.
          </p>
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownloadClick}
          className="hover:from-primary/45 to-primary/90 group h-16 transform rounded-2xl bg-gradient-to-r from-primary px-12 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:to-primary hover:shadow-2xl active:scale-95"
        >
          <Download className="mr-3 h-6 w-6 group-hover:animate-bounce" />
          Download App
          <Star className="ml-3 h-5 w-5 group-hover:animate-spin" />
        </Button>
      </div>

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

      {/* Desktop Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="border-0 bg-white/95 shadow-2xl backdrop-blur-sm sm:max-w-md">
          <DialogHeader className="space-y-4 text-center">
            <div className="to-primary-dark animate-pulse-lime mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary">
              <QrCode className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Mobile Optimized Experience
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <p className="text-center leading-relaxed text-gray-600">
              Thank you for your interest! Lovabler is specifically designed and
              optimized for mobile devices to give you the best experience.
            </p>

            {/* QR Code Placeholder */}
            <div className="border-primary/20 mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-gray-100 to-gray-200">
              <div className="space-y-2 text-center">
                <QrCode className="mx-auto h-16 w-16 text-primary" />
                <p className="text-sm font-medium text-gray-500">
                  QR Code Placeholder
                </p>
              </div>
            </div>

            <div className="space-y-2 text-center">
              <p className="font-semibold text-gray-800">
                Scan this QR code on your mobile device
              </p>
              <p className="text-sm text-gray-600">
                to download and launch the app
              </p>
            </div>

            <Button
              onClick={() => setShowModal(false)}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 h-12 w-full text-primary transition-all duration-300 hover:border-primary"
            >
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DownloadScreen;
