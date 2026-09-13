import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves the generated files directly; no Node server is
  // required at request time.
  output: "export",
  trailingSlash: true,
  compress: true,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "gray-matter", "fuse.js"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  images: {
    // The Next image optimiser is a server feature. Remote images remain
    // available and are loaded directly by the browser on a static host.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "t0.gstatic.com" },
      { protocol: "https", hostname: "unavatar.io" },
    ],
  },
};

export default nextConfig;
