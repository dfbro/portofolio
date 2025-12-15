import type {NextConfig} from 'next';

const appHostname = process.env.APP_HOSTNAME || 'localhost:9002';

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    appHostname,
    "localhost"
  ],
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost", appHostname],
    },
  },
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
