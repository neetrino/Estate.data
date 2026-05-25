import type { NextConfig } from "next";

/** LAN / alternate hosts for `next dev` (client hydration + HMR). See allowedDevOrigins. */
const devAllowedOrigins = [
  "127.0.0.1",
  "localhost",
  "192.168.15.*",
  ...(process.env.DEV_ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) ?? []),
];

function buildApiAssetRemotePattern(): {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
} {
  const fallback = {
    protocol: "http" as const,
    hostname: "localhost",
    port: "3001",
    pathname: "/api/v1/assets/**",
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return fallback;
  }

  try {
    const parsed = new URL(apiUrl);
    return {
      protocol: parsed.protocol === "https:" ? "https" : "http",
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname: "/api/v1/assets/**",
    };
  } catch {
    return fallback;
  }
}

export const nextConfig: NextConfig = {
  allowedDevOrigins: devAllowedOrigins,
  transpilePackages: ["@estate/db"],
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/api/v1/assets/**" },
    ],
    remotePatterns: [buildApiAssetRemotePattern()],
  },
  experimental: {
    optimizePackageImports: ["zod"],
  },
};

export default nextConfig;
