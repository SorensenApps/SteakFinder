import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Cloudflare Pages specific configuration
  experimental: {
    // Ensure compatibility with Cloudflare Pages
    esmExternals: false,
  },
  // Ensure proper static export for Cloudflare Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
