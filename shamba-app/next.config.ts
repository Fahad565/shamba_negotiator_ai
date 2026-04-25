import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Allow mobile testing on the local network
  serverExternalPackages: [],
  experimental: {
    allowedDevOrigins: ['192.168.43.228', 'localhost:3000'],
  }
};

export default nextConfig;
