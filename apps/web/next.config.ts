import type { NextConfig } from "next";

/**
 * Web app only — API lives in apps/api (separate Next.js).
 * Uncomment rewrites when you want same-origin /api/* proxy in dev.
 */
export const nextConfig: NextConfig = {
  transpilePackages: ["@estate/db"],
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/api/v1/assets/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["zod"],
  },
  // async rewrites() {
  //   const apiOrigin = process.env.API_DEV_ORIGIN ?? "http://localhost:3001";
  //   return [
  //     { source: "/api/:path*", destination: `${apiOrigin}/:path*` },
  //   ];
  // },
};

export default nextConfig;
