import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@t7blocks/ui"],
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-30f77b34698b4af9acb780d4dfe7ee4d.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "pub-ce7c82a074d24c96a153a74a9158dc02.r2.dev",
      },
    ],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;