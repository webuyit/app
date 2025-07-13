'use client';

import { useEffect } from 'react';

import { usePrivy } from '@privy-io/react-auth';
import { useTransitionRouter } from 'next-view-transitions';

import { useUser } from '@/hooks/useUser';
import { isInStandaloneMode } from '@/lib/isStandAlone';
import { useUserStore } from '@/lib/stores/useUserStore';

const InitUserClient = () => {
  const { ready, authenticated } = usePrivy();
  const router = useTransitionRouter();

  const { data, isLoading, isError } = useUser();

  const setUser = useUserStore((s) => s.setUser);
  const setStats = useUserStore((s) => s.setStats);

  // Skip everything if not installed as PWA
  const isStandalone = typeof window !== 'undefined' && isInStandaloneMode();

  useEffect(() => {
    if (!isStandalone) return; // ⛔️ Exit early if not installed
    if (data) {
      setUser(data.user);
      setStats(data.stats);
    }
  }, [data, isStandalone]);

  // Redirect to onboarding if auth is ready but user isn't authenticated or fetch failed
  useEffect(() => {
    if (!isStandalone) return;
    if (ready && (!authenticated || isError)) {
      router.replace('/onboarding');
      console.log(`redirecting to onboarding`);
    }
  }, [ready, authenticated, isError, isStandalone]);

  return null;
};

/*const InitUserClient = () => {
  const { ready, authenticated } = usePrivy();
  const router = useTransitionRouter();
  const { data, isLoading, isError } = useUser();

  const setUser = useUserStore((s) => s.setUser);
  const setStats = useUserStore((s) => s.setStats);

  useEffect(() => {
    // Skip anything if not in standalone mode (PWA)
    if (typeof window !== 'undefined' && !window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    if (data) {
      setUser(data.user);
      setStats(data.stats);
    }
  }, [data]);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !window.matchMedia('(display-mode: standalone)').matches
    ) {
      return;
    }

    if (ready && (!authenticated || isError)) {
      router.replace('/onboarding');
    }
  }, [ready, authenticated, isError]);

  return null;
};*/

export default InitUserClient;
