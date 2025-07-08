'use client';

import { useEffect } from 'react';

import { usePrivy } from '@privy-io/react-auth';
import { useTransitionRouter } from 'next-view-transitions';

import { useUser } from '@/hooks/useUser';
import { useUserStore } from '@/lib/stores/useUserStore';

const InitUserClient = () => {
  const { ready, authenticated } = usePrivy();
  const router = useTransitionRouter();

  const { data, isLoading, isError } = useUser();

  const setUser = useUserStore((s) => s.setUser);
  const setStats = useUserStore((s) => s.setStats);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setStats(data.stats);
    }
  }, [data]);

  // Redirect to onboarding if auth is ready but user isn't authenticated or fetch failed
  useEffect(() => {
    if (ready && (!authenticated || isError)) {
      router.replace('/onboarding');
    }
  }, [ready, authenticated, isError]);

  return null;
};

export default InitUserClient;
