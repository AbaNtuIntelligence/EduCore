/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'production' ? true : false,
  },
  output: 'standalone',
};

export default nextConfig;
