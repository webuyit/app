'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Smartphone, Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('Loading…');

  useEffect(() => {
    const messages = [
      'Loading the arena…',
      'Predict greatness…',
      'Syncing GOAT energy…',
      'Warming up Mbappé…',
      'Scouting fan battles…',
      'Summoning PvP stats…',
      'Fetching bold predictions…',
    ];

    const random = Math.floor(Math.random() * messages.length);
    setLoadingText(messages[random]);
  }, []);

  return (
    <div className="relative mx-auto flex h-screen w-full flex-col items-center justify-center md:max-w-md md:border-x md:border-gray-200">
      <div className="flex w-full flex-col items-center justify-center">
        <Image
          src={`/img/logo.png`}
          width={100}
          height={100}
          alt="logo"
          className="animate-pulse"
        />
      </div>

      <div className="absolute bottom-10">
        <p className="animate-bounce text-center text-lg font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
