import React from 'react';

import Prrofile from '@/components/players/profile';
import PlayerProfile from '@/components/players/profile';

export default async function page({ params }: any) {
  const playerId = await params?.playerId;
  console.log('params', playerId);
  return (
    <div>
      <PlayerProfile />
    </div>
  );
}
