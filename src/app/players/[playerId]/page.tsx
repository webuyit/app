import React from 'react';

import Prrofile from '@/components/players/profile';
import PlayerProfile from '@/components/players/profile';
import { SERVER_URL } from '@/lib/constants';

export default async function page({ params }: any) {
  const playerId = await params?.playerId;
  const res = await fetch(`${SERVER_URL}players/player/${playerId}`, {
    //next: { revalidate: 60 }, // Revalidate every 60s
    cache: 'no-store',
  });
  const player = await res.json();

  return (
    <div>
      <PlayerProfile player={player} />
    </div>
  );
}
