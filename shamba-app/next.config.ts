import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Allow mobile testing on the local network
  // @ts-ignore
  allowedDevOrigins: ['192.168.43.228', 'localhost:3000'],
  serverExternalPackages: [],
};

export default nextConfig;
