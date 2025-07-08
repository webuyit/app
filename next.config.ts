import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      new URL('https://pbs.twimg.com/profile_images/**'),
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        //pathname: '/images/**',
      },
    ],
  },
};

//export default nextConfig;
const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);

//pbs.twimg.com
