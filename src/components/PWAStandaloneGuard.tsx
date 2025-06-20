'use client';

import { useEffect } from 'react';

import { useTransitionRouter } from 'next-view-transitions';

//import { useRouter } from 'next/navigation';
import { isInStandaloneMode } from '@/lib/isStandAlone';

export default function PWAStandaloneGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useTransitionRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isStandalone = isInStandaloneMode();
      if (!isStandalone) {
        router.replace('/download');
      }
    }
  }, []);

  return <>{children}</>;
}
