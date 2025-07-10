import { BottomNavigation } from '@/components/bottom-navigation';
import BottomNav from '@/components/home/bottom-navbar';
import { WgamiRainbowProvider } from '@/components/providers/rainbowKitProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`w-full md:mx-auto md:max-w-md`}>
      <WgamiRainbowProvider>{children}</WgamiRainbowProvider>
    </div>
  );
}
