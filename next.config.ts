import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Don't block builds on ESLint errors in Vercel/CI
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
