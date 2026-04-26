import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },

  async rewrites() {
    return [
      {
        source: "/api/graphql",
        destination: process.env.GRAPHQL_URL!,
      },
    ];
  },
};

export default nextConfig;
