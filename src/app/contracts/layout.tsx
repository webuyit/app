import type { Metadata } from 'next';

import BottomNav from '@/components/home/bottom-navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`w-full md:mx-auto md:max-w-md`}>{children}</div>;
}
