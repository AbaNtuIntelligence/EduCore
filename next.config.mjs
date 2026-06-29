/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placehold.co'],
    unoptimized: process.env.NODE_ENV === 'production' ? true : false,
  },
  output: 'standalone',
};

export default nextConfig;
