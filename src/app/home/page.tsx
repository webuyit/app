import { cookies } from 'next/headers';

import PWAStandaloneGuard from '@/components/PWAStandaloneGuard';
import Home from '@/components/home-2/home';
import { SERVER_URL } from '@/lib/constants';
import { MARKET, MARKETS, PLAYERS, TOURNAMENTS } from '@/types/types';

export default async function page() {
  // Fetch all 3 in parallel with caching
  const [playersRes, popularMarketsRes, upcomingMarketsRes, tournamentsRes] =
    await Promise.all([
      fetch(`${SERVER_URL}players/basic?limit=10`, {
        //next: { revalidate: 60 }, // Revalidate every 60s
        cache: 'no-store',
      }),
      fetch(`${SERVER_URL}markets/popular?limit=7`, {
        // next: { revalidate: 120 },
        cache: 'no-store',
      }),
      fetch(`${SERVER_URL}markets/upcoming?limit=8`, {
        // next: { revalidate: 120 },
        cache: 'no-store',
      }),
      fetch(`${SERVER_URL}tournaments`, {
        //next: { revalidate: 300 },
        cache: 'no-store',
      }),
    ]);

  // Parse JSON responses
  const [players, popularMarkets, upcomingMarkets, tournaments]: [
    PLAYERS,
    MARKET[],
    MARKET[],
    TOURNAMENTS,
  ] = await Promise.all([
    playersRes.json(),
    popularMarketsRes.json(),
    upcomingMarketsRes.json(),
    tournamentsRes.json(),
  ]);

  return (
    <div className="">
      {/*} <PWAStandaloneGuard>*/}
      <Home
        players={players}
        popularMarkets={popularMarkets}
        upcomingMarkets={upcomingMarkets}
        tournaments={tournaments}
      />
      {/*} </PWAStandaloneGuard>*/}
    </div>
  );
}
