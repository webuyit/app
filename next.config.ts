import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        pathname: '/**', // ✅ this is required
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // ✅ this is required
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // ✅ this is required
      },
    ],
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
