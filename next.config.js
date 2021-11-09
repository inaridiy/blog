module.exports = {
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
  },
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(','),
    formats: ['image/avif', 'image/webp'],
  },
};
