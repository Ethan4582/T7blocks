import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@t7blocks/ui"],
   output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;