/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ria-compliance-system',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;