import React from 'react';

import UpcomingEvents from '@/components/upcoming-events/upcomings';
import { SERVER_URL } from '@/lib/constants';

export default async function page() {
  const res = await fetch(`${SERVER_URL}markets/basic?limit=10`, {
    // next: { revalidate: 120 },
    cache: 'no-store',
  });
  const markets = await res.json();

  return (
    <div>
      <UpcomingEvents initialMarkets={markets} />
    </div>
  );
}
