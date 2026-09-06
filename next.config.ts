import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow local network mobile devices without blocking HMR / chunks
  allowedDevOrigins: [
    "192.168.100.2",
    "192.168.100.2:3000",
    "localhost",
    "localhost:3000",
    "127.0.0.1",
    "127.0.0.1:3000"
  ],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },
};

export default nextConfig;
