import type { NextConfig } from "next";

const allowedOrigin = process.env.APP_URL ?? "http://localhost:3000";

export const nextConfig: NextConfig = {
  transpilePackages: ["@estate/db"],
  experimental: {
    optimizePackageImports: ["zod"],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: allowedOrigin },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
