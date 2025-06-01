import type { Metadata } from 'next';

import BottomNav from '@/components/home/bottom-navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`w-full border-emerald-600 px-2 md:mx-auto md:max-w-md md:border`}
    >
      {children}
      <div>
        <BottomNav />
      </div>
    </div>
  );
}
