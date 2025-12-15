import type {NextConfig} from 'next';

const appHostname = process.env.APP_HOSTNAME || 'localhost';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
       {
        protocol: 'https',
        hostname: appHostname.split(':')[0],
      },
      {
        protocol: 'http',
        hostname: appHostname.split(':')[0],
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

export default nextConfig;
