'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { MARKET } from '@/types/types';

import { MarketCard } from './test-market-card';

async function fetchMarkets(): Promise<MARKET[]> {
  const res = await fetch('http://localhost:4000/api/v1/markets');
  if (!res.ok) throw new Error('Failed to fetch markets');
  return res.json();
}

export default function MarketList() {
  const {
    data: markets,
    isLoading,
    error,
  } = useQuery<MARKET[]>({
    queryKey: ['markets'],
    queryFn: fetchMarkets,
  });

  if (isLoading) return <p>Loading markets...</p>;
  if (error) return <p>Error loading markets</p>;

  console.log('markets is', markets);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">🔥 Live Markets</h2>
      {markets?.markets?.map((market) => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  );
}
