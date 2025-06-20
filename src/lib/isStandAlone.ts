export function isInStandaloneMode(): boolean {
  const isIOS = /iphone|ipad|ipod/.test(
    window.navigator.userAgent.toLowerCase(),
  );
  const isAndroid = /android/.test(window.navigator.userAgent.toLowerCase());

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // For iOS Safari
    (isIOS &&
      'standalone' in window.navigator &&
      (window.navigator as any).standalone)
  );
}

export function getDevicePlatform(): 'ios' | 'android' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/ipad|tablet/.test(ua)) return 'tablet';
  if (/iphone|ipod/.test(ua)) return 'ios';
  return 'desktop';
}
