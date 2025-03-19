/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  publicRuntimeConfig: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  webpack: (config) => {
    return {
      ...config,
      cache: false,
      externals: [...config.externals, 'pino-pretty', 'encoding'],
    };
  },
};

export default nextConfig;
