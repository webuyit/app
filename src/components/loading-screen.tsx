'use clirnt';

import React from 'react';

import { Loader2, Smartphone, Sparkles } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 size={80} className="animate-spin" />
    </div>
  );
};

export default LoadingScreen;
