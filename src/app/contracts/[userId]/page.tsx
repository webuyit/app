import React from 'react';

import MyBets from '@/components/contracts/my-bets';
import { SERVER_URL } from '@/lib/constants';
import { UserBets } from '@/types/types';

export default async function page({ params }: any) {
  const userId = await params?.userId;
  const res = await fetch(`${SERVER_URL}bets/user?userId=${userId}`, {
    //next: { revalidate: 60 }, // Revalidate every 60s
    cache: 'no-store',
  });
  const bets: UserBets = await res.json();
  console.log('user bets', bets);
  return (
    <div>
      <MyBets
        openBets={bets.openBets}
        settledBets={bets.settledBets}
        profitToday={bets.profitToday}
        liveBets={bets.liveBets}
      />
    </div>
  );
}
