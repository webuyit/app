'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//import { queryClient } from '@/lib/query-client';

// Create a client
const queryClient = new QueryClient();
export default function PrivyProviderComp({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(process.env.NEXT_PUBLIC_PRIVY_APP_ID);
  return (
    <QueryClientProvider client={queryClient}>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!} // PRIVY_APP_ID
        clientId={process.env.PRIVY_APP_SECRET!}
        config={{
          appearance: {
            theme: 'light',
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
    </QueryClientProvider>
  );
}
