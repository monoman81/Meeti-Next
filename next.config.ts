import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    typedRoutes: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'p908bjdc48.ufs.sh',
            }
        ]
    }
};

export default nextConfig;
