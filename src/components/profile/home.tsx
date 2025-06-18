import React from 'react';

import Balance from './balance';
import ClaimFaucet from './claim-faucet';
import TopInfo from './top-info';
import UserData from './user-data';

export default function Home() {
  return (
    <div className="space-y-6">
      <TopInfo />
      <ClaimFaucet />
      <Balance />
      <UserData />
    </div>
  );
}
