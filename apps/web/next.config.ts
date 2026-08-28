import type { NextConfig } from "next";

/** LAN / alternate hosts for `next dev` (client hydration + HMR). See allowedDevOrigins. */
const devAllowedOrigins = [
  "127.0.0.1",
  "localhost",
  "192.168.15.*",
  ...(process.env.DEV_ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()) ?? []),
];

type ImageRemotePattern = {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
};

function urlToRemotePattern(rawUrl: string, pathname: string): ImageRemotePattern | null {
  try {
    const parsed = new URL(rawUrl);
    return {
      protocol: parsed.protocol === "https:" ? "https" : "http",
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname,
    };
  } catch {
    return null;
  }
}

function buildImageRemotePatterns(): ImageRemotePattern[] {
  const apiPattern =
    urlToRemotePattern(process.env.NEXT_PUBLIC_API_URL ?? "", "/api/v1/assets/**") ?? {
      protocol: "http",
      hostname: "localhost",
      port: "3000",
      pathname: "/api/v1/assets/**",
    };

  const r2Pattern = urlToRemotePattern(process.env.R2_PUBLIC_URL ?? "", "/**");

  return [
    apiPattern,
    ...(r2Pattern ? [r2Pattern] : []),
    { protocol: "https", hostname: "*.r2.dev", pathname: "/**" },
  ];
}

export const nextConfig: NextConfig = {
  allowedDevOrigins: devAllowedOrigins,
  transpilePackages: ["@estate/db"],
  images: {
    localPatterns: [
      { pathname: "/images/**" },
      { pathname: "/icons/**" },
      { pathname: "/assets/*" },
      { pathname: "/assets/**" },
      { pathname: "/__l5e/**" },
      { pathname: "/api/v1/assets/**" },
    ],
    remotePatterns: buildImageRemotePatterns(),
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
  async rewrites() {
    return [
      { source: "/favicon.ico", destination: "/favicon.png" },
      { source: "/assets/:file.jpg", destination: "/assets/:file.webp" },
      { source: "/assets/:file.jpeg", destination: "/assets/:file.webp" },
    ];
  },
};

export default nextConfig;
