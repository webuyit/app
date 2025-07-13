'use client';

import { useEffect } from 'react';

import { usePrivy } from '@privy-io/react-auth';
import { useTransitionRouter } from 'next-view-transitions';

import { SERVER_URL } from '@/lib/constants';
import { isInStandaloneMode } from '@/lib/isStandAlone';

import LoadingScreen from '../loading-screen';

export default function LoaderScreen() {
  const { ready, authenticated, user } = usePrivy();
  const router = useTransitionRouter();

  useEffect(() => {
    // Ensure we’re in standalone mode (PWA)
    if (typeof window !== 'undefined' && !isInStandaloneMode()) {
      return;
    }
    // Avoid running anything before Privy is ready
    if (!ready) return;

    const handleRedirect = async () => {
      // 1. Not authenticated? Go to onboarding
      if (!authenticated || !user) {
        router.replace('/onboarding');
        return;
      }

      // 2. Authenticated — check early access from your backend
      try {
        const res = await fetch(
          `${SERVER_URL}users/early-access?privyId=${user.id}`,
        );
        const data = await res.json();

        if (!data?.earlyAccess) {
          router.replace('/access-code');
        } else {
          router.replace('/home');
        }
      } catch (err) {
        console.error('Failed to check early access:', err);
        // Optional: show error state
      }
    };

    handleRedirect();
  }, [ready, authenticated, user]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingScreen />
    </div>
  );
}

/*'use client';

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
}*/
