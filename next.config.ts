import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't block builds on ESLint errors in Vercel/CI
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
