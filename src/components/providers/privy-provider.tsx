'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function PrivyProviderComp({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(process.env.NEXT_PUBLIC_PRIVY_APP_ID);
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} // PRIVY_APP_ID
      clientId={process.env.PRIVY_APP_SECRET!}
      config={{
        appearance: {
          theme: 'dark',
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
