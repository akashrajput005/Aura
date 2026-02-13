/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["@prisma/client"],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
