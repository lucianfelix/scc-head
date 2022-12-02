/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
    //runtime: 'experimental-edge',
  },
  images: {
    minimumCacheTTL: 12000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'main--upm--hlxsites.hlx.live',
        // port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
