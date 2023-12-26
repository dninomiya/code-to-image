/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/code-to-image',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
