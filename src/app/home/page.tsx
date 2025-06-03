import React from 'react';

import Announcements from '@/components/home/announcements';
import Players from '@/components/home/players';
import Popular from '@/components/home/popular-games';
import UpcomingGames from '@/components/home/upcoming/upcoming-games';

export default function page() {
  return (
    <div>
      <div className="space-y-4">
        <Announcements />
        <Players />
        <Popular />
        <UpcomingGames />
      </div>
      Home page
    </div>
  );
}
