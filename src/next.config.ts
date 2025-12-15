import type {NextConfig} from 'next';

const appHostname = process.env.APP_HOSTNAME || 'localhost:9002';
const publicHostname = 'mikir.lylo.eu.org';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost", "127.0.0.1:9002", appHostname, publicHostname],
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
