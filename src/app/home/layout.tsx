import type { Metadata } from 'next';

import BottomNav from '@/components/home/bottom-navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`w-full overflow-hidden border-emerald-600 md:mx-auto md:max-w-md md:border`}
    >
      {children}
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
