import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@t7blocks/ui"],
  output: "export",
};

export default nextConfig;