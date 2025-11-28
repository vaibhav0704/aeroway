import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aeroway.s3-eu-central-2.ionoscloud.com",
      },
    ],
  },
};

export default nextConfig;
