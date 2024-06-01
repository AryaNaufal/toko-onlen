const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['images.tokopedia.net'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.tokopedia.net',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '**',
      }
    ],
  }
}

module.exports = nextConfig
