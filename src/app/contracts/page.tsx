import React from 'react';

import PWAStandaloneGuard from '@/components/PWAStandaloneGuard';
import MyBets from '@/components/contracts/contracts';

export default function page() {
  return (
    <div>
      {/*<PWAStandaloneGuard>*/}
      <MyBets />
      {/*</PWAStandaloneGuard>*/}
    </div>
  );
}
