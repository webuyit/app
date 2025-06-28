import LearnTopNavbar from '@/components/learn/top-navba';
import OpenApp from '@/components/openApp';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`min-h-screen bg-gray-50 pb-20 md:mx-auto md:max-w-md md:border-x md:border-gray-200`}
    >
      <div>
        <LearnTopNavbar />
        {children}
      </div>
    </div>
  );
}
