import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://57.128.243.135:8055",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM http://57.128.243.135:8055",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
