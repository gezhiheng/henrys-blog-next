import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allow deployments to proceed even if type errors exist.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
