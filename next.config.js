/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/ria-compliance-system',
  images: { unoptimized: true },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig