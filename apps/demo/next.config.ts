import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@t7blocks/ui"],
  output: "export",
  images: {
    unoptimized: true,
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;