'use client';

import React, { useEffect } from 'react';

import { usePrivy } from '@privy-io/react-auth';
import { useTransitionRouter } from 'next-view-transitions';

import LoadingScreen from '../loading-screen';

export default function LoaderSCreen() {
  const { ready, authenticated, logout, user } = usePrivy();
  const router = useTransitionRouter();

  useEffect(() => {
    if (!ready) return;

    if (!authenticated || !user) {
      router.replace('/onboarding');
    } else if (authenticated && user) {
      router.replace('/home');
    }
  }, [ready, authenticated, user]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingScreen />
    </div>
  );
}
