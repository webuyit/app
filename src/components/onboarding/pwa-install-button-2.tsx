'use client';

import { useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

export default function PWAInstallPortal() {
  const pwaRef = useRef<any>(null);

  useEffect(() => {
    import('@khmyznikov/pwa-install');
  }, []);

  // Ensure you're not rendering on the server
  if (typeof document === 'undefined') return null;

  return createPortal(
    <pwa-install
      ref={pwaRef}
      manifest-url="/manifest.webmanifest"
      manual-chrome="true"
      manual-apple="true"
    ></pwa-install>,
    document.body,
  );
}
