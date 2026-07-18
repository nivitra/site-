import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // a stray lockfile in the home directory confuses workspace-root inference
  turbopack: {
    root: __dirname,
  },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "animejs"],
  },
};

export default nextConfig;
