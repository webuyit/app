import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ViewTransitions } from 'next-view-transitions';

import ForceDarkMode from '@/components/auto-theme-switcher';
import PrivyProviderComp from '@/components/providers/privy-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GOAT — Predict the Game Within the Game',
  description:
    'GOAT is the Web3-powered PvP betting app where you predict athlete performance — not just match results. Place bets on player actions like goals, assists, and points using dynamic odds and fan tokens.',
  manifest: '/manifest.webmanifest',
  keywords: [
    'GOAT app',
    'Web3 betting',
    'PvP predictions',
    'sports prediction market',
    'athlete betting',
    'Mbappé bet',
    'Ronaldo fan token',
    'Socios betting',
    'Chiliz fan token',
    'crypto betting',
  ],
  metadataBase: new URL('https://yourappdomain.com'),
  openGraph: {
    title: 'GOAT — Predict the Game Within the Game',
    description:
      'Join GOAT — the ultimate Web3 platform for athlete-focused PvP predictions. Bet on what your favorite players will do next.',
    url: 'https://yourappdomain.com',
    siteName: 'GOAT',
    images: [
      {
        url: '/og-image.jpg', // Make sure this exists in /public
        width: 1200,
        height: 630,
        alt: 'GOAT — Predict the Game Within the Game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GOAT — Predict the Game Within the Game',
    description:
      'Bet on your favorite athletes using Web3. Join private or public tournaments and compete with your fan tokens.',
    images: ['/og-image.jpg'],
    creator: '@goatapp', // your Twitter handle
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} `}>
          <PrivyProviderComp>
            <TooltipProvider>{children}</TooltipProvider>
          </PrivyProviderComp>

          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
