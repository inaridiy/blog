const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
  },
  pwa: {
    dest: 'public',
  },
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(','),
    formats: ['image/avif', 'image/webp'],
  },
});
