import { cookies } from 'next/headers';

import PWAStandaloneGuard from '@/components/PWAStandaloneGuard';
import Home from '@/components/home-2/home';
import { SERVER_URL } from '@/lib/constants';
import { MARKETS, PLAYERS, TOURNAMENTS } from '@/types/types';

export default async function page() {
  // Fetch all 3 in parallel with caching
  const [playersRes, marketsRes, tournamentsRes] = await Promise.all([
    fetch(`${SERVER_URL}players/basic?limit=5`, {
      //next: { revalidate: 60 }, // Revalidate every 60s
      cache: 'no-store',
    }),
    fetch(`${SERVER_URL}markets/basic?limit=5`, {
      // next: { revalidate: 120 },
      cache: 'no-store',
    }),
    fetch(`${SERVER_URL}tournaments`, {
      //next: { revalidate: 300 },
      cache: 'no-store',
    }),
  ]);

  // Parse JSON responses
  const [players, markets, tournaments]: [PLAYERS, MARKETS, TOURNAMENTS] =
    await Promise.all([
      playersRes.json(),
      marketsRes.json(),
      tournamentsRes.json(),
    ]);

  return (
    <div className="">
      <PWAStandaloneGuard>
        <Home players={players} markets={markets} tournaments={tournaments} />
      </PWAStandaloneGuard>
    </div>
  );
}
