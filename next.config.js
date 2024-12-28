/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: process.env.GITHUB_ACTIONS ? '/ria-compliance-system' : '',
}

module.exports = nextConfig