// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'k.kakaocdn.net' },
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'img1.kakaocdn.net' },
    ],
  },
};

export default nextConfig;
