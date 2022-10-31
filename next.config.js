/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net'
      }
    ]
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN: process.env.CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN,
    CONTENTFUL_CONTENT_PREVIEW_API_ACCESS_TOKEN: process.env.CONTENTFUL_SPACE_ID,
  }
}

module.exports = nextConfig
