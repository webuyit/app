'use client';

import dynamic from 'next/dynamic';

import { PWAInstallElement } from '@khmyznikov/pwa-install';

import { getDevicePlatform } from '@/lib/isStandAlone';

import PWAInstallPortal from './pwa-install-button-2';

const PWAInstallButton = dynamic(
  () => import('@/components/onboarding/pwa-install-button'),
  { ssr: false },
);
export default function DownloadPage() {
  const platform = getDevicePlatform();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Download Our App</h1>
      <p className="text-gray-600">Enjoy a faster, fullscreen experience.</p>

      {/* Trigger Install */}

      <PWAInstallButton />
      {/* Example: show current device */}
      <div className="mt-4 text-sm text-gray-500">
        Detected platform: <strong>{platform}</strong>
      </div>
    </div>
  );
}
