import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
    },
    // Enable the use of Node.js core modules in the browser
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Don't resolve 'fs', 'os', 'path', etc. on the client to prevent errors
            config.resolve.fallback = {
                fs: false,
                os: false,
                path: false,
                util: false,
            };
        }
        return config;
    },
};

export default nextConfig;
