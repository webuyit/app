import React from 'react';

import PWAStandaloneGuard from '@/components/PWAStandaloneGuard';
import Explore from '@/components/explore/explore';
import { SERVER_URL } from '@/lib/constants';
import { MARKETS, PLAYERS, TOURNAMENTS } from '@/types/types';

export default async function page() {
  // Fetch all 3 in parallel with caching
  const [playersRes, marketsRes] = await Promise.all([
    fetch(`${SERVER_URL}players/basic?limit=5`, {
      //next: { revalidate: 60 }, // Revalidate every 60s
      cache: 'no-store',
    }),
    fetch(`${SERVER_URL}markets/basic?limit=5`, {
      // next: { revalidate: 120 },
      cache: 'no-store',
    }),
    /*fetch(`${SERVER_URL}tournaments`, {
      //next: { revalidate: 300 },
      cache: 'no-store',
    }),*/
  ]);

  // Parse JSON responses
  const [players, markets]: [PLAYERS, MARKETS] = await Promise.all([
    playersRes.json(),
    marketsRes.json(),
    //tournamentsRes.json(),
  ]);
  return (
    <div>
      {/*<PWAStandaloneGuard>*/}
      <Explore players={players.players} markets={markets.markets} />
      {/*</PWAStandaloneGuard>*/}
    </div>
  );
}
