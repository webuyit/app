'use client';

import { useEffect } from 'react';

import { usePrivy } from '@privy-io/react-auth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTransitionRouter } from 'next-view-transitions';

import { SERVER_URL } from '@/lib/constants';
import { useUserStore } from '@/lib/stores/useUserStore';

type Props = {
  user: any;
  stats: {
    betsCount: number;
    unreadNotifications: number;
  };
};

const InitUserClient = () => {
  const { ready, authenticated, logout, user: privyUser } = usePrivy();
  const setUser = useUserStore((s) => s.setUser);
  const setStats = useUserStore((s) => s.setUser);
  const router = useTransitionRouter();
  const fectchUser = async () => {
    const res = await axios.get(
      `${SERVER_URL}users/user/basic?privyId=${privyUser?.id}`,
    );
    return res.data;
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fectchUser,
    enabled: !!ready && !!privyUser,
  });

  useEffect(() => {
    if (user) setUser(user);
    if (user) setStats(user.stats);
  }, [user]);

  // Redirect if ready but no user info (either not authenticated or fetch failed)
  useEffect(() => {
    if (ready && (!authenticated || isError)) {
      router.replace('/onboarding');
    }
  }, [ready, authenticated, isError]);
  return null;
};

export default InitUserClient;
