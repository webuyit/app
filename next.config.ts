import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://pbs.twimg.com/profile_images/**')],
  },
};

export default nextConfig;

//pbs.twimg.com
