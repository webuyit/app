import React from 'react';

import Announcements from '@/components/home/announcements';
import Players from '@/components/home/players';
import Popular from '@/components/home/popular-games';

export default function page() {
  return (
    <div>
      <div className="space-y-4">
        <Announcements />
        <Players />
        <Popular />
      </div>
      Home page
    </div>
  );
}
