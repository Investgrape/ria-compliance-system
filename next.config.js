/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/ria-compliance-system',
  assetPrefix: '/ria-compliance-system/',
  trailingSlash: true,
}

module.exports = nextConfig