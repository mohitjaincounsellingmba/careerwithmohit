import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-expect-error eslint is supported but missing from local types
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
