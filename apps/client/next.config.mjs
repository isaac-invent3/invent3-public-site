/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    return {
      ...config,
      cache: false,
      externals: [...config.externals, 'pino-pretty', 'encoding'],
    };
  },
};

export default nextConfig;
