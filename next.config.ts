import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    // Allow deployments to proceed even if type errors exist.
    ignoreBuildErrors: true,
  },
}

export default nextConfig
