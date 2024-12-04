import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export',
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://kroy665.github.io/profile-cmd' : './',
};

export default nextConfig;
