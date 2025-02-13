/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // this includes files from the monorepo base two directories up
  outputFileTracingRoot: path.join(__dirname, '../../'),
  webpack: (config) => {
    return {
      ...config,
      cache: false,
      externals: [...config.externals, 'pino-pretty', 'encoding'],
    };
  },
};

export default nextConfig;
