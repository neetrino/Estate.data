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
    port: "3000",
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
      { pathname: "/icons/**" },
      { pathname: "/assets/**" },
      { pathname: "/__l5e/**" },
      { pathname: "/api/v1/assets/**" },
    ],
    remotePatterns: [buildApiAssetRemotePattern()],
  },
  experimental: {
    optimizePackageImports: ["zod"],
  },
  async redirects() {
    return [
      { source: "/services/photography", destination: "/?section=photography", permanent: true },
      { source: "/services/video-production", destination: "/?section=video", permanent: true },
      { source: "/services/drone-services", destination: "/?section=drone", permanent: true },
      {
        source: "/services/3d-tours-visualization",
        destination: "/?section=tours",
        permanent: true,
      },
      {
        source: "/services/floor-plans-2d-3d",
        destination: "/?section=floor-plans",
        permanent: true,
      },
      { source: "/services/ai-media", destination: "/?section=ai-media", permanent: true },
      {
        source: "/services/laser-scanning-scan-to-bim",
        destination: "/?section=scan-to-bim",
        permanent: true,
      },
      {
        source: "/services/property-landing-pages",
        destination: "/web-pages",
        permanent: true,
      },
      { source: "/services/mls-solutions", destination: "/", permanent: true },
      { source: "/services", destination: "/?section=photography", permanent: true },
      { source: "/contact", destination: "/?section=contact", permanent: true },
      { source: "/pricing", destination: "/?section=packages", permanent: true },
      { source: "/portfolio", destination: "/?section=portfolio", permanent: true },
      { source: "/about", destination: "/?section=studio", permanent: true },
      { source: "/solutions", destination: "/", permanent: true },
      { source: "/data-bim", destination: "/?section=scan-to-bim", permanent: true },
      { source: "/services/data", destination: "/?section=scan-to-bim", permanent: true },
      { source: "/resources", destination: "/?section=faq", permanent: true },
      { source: "/resources/:slug", destination: "/?section=faq", permanent: true },
    ];
  },
};

export default nextConfig;
