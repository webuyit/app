import React from 'react';

import Profile from '@/components/profile/profile';
import { SERVER_URL } from '@/lib/constants';
import { UserTransactions } from '@/types/types';

export default async function page({ params }: any) {
  const userId = await params?.profileId;
  const res = await fetch(
    `${SERVER_URL}users/transactions/user?userId=${userId}&limit=5`,
    {
      //next: { revalidate: 60 }, // Revalidate every 60s
      cache: 'no-store',
    },
  );
  const transactions: UserTransactions = await res.json();

  return (
    <div className="">
      <Profile transactions={transactions.transactions} />
    </div>
  );
}
