/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,
  output: 'standalone',
  experimental: {
    typedRoutes: true,
  },
};
