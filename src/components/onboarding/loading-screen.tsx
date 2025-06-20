import React from 'react';

import { Smartphone, Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="bg-brand-lime absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full blur-3xl"></div>
        <div
          className="bg-brand-lime absolute bottom-1/4 right-1/4 h-40 w-40 animate-pulse rounded-full blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="animate-fade-in relative z-10 space-y-8 text-center">
        {/* Logo/Brand Icon */}
        <div className="mb-8 flex items-center justify-center space-x-3">
          <div className="relative">
            <div className="from-brand-lime to-brand-lime-dark animate-pulse-lime flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br shadow-2xl">
              <Smartphone className="h-8 w-8 text-white" />
            </div>
            <Sparkles
              className="text-brand-lime absolute -right-2 -top-2 h-6 w-6 animate-spin"
              style={{ animationDuration: '3s' }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            <span className="from-brand-lime to-brand-lime-dark bg-gradient-to-r bg-clip-text text-transparent">
              Lovabler
            </span>
          </h1>
          <p className="text-lg font-medium text-gray-600">
            Preparing your experience…
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex flex-col items-center space-y-4">
          {/* Animated Progress Bar */}
          <div className="h-1.5 w-64 overflow-hidden rounded-full bg-gray-200 shadow-inner">
            <div className="from-brand-lime to-brand-lime-dark animate-loading-progress h-full rounded-full bg-gradient-to-r"></div>
          </div>

          {/* Pulsing Dots */}
          <div className="flex space-x-2">
            <div className="bg-brand-lime h-2 w-2 animate-bounce rounded-full"></div>
            <div
              className="bg-brand-lime h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="bg-brand-lime h-2 w-2 animate-bounce rounded-full"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>

        {/* Subtle Brand Message */}
        <div className="mx-auto mt-12 max-w-sm space-y-2">
          <p className="text-sm leading-relaxed text-gray-500">
            Smart scheduling powered by AI
          </p>
          <div className="text-brand-lime flex items-center justify-center space-x-1 text-xs font-medium">
            <div className="bg-brand-lime h-1 w-1 animate-pulse rounded-full"></div>
            <span>Premium Mobile Experience</span>
            <div className="bg-brand-lime h-1 w-1 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50/50 to-transparent"></div>
    </div>
  );
};

export default LoadingScreen;
