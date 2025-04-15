/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // env: {
  //   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  //   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  //   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // },
  webpack: (config) => {
    return {
      ...config,
      cache: false,
      externals: [...config.externals, 'pino-pretty', 'encoding'],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
