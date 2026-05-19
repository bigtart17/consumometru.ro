import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.consumometru.ro"
          }
        ],
        destination: "https://consumometru.ro/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
