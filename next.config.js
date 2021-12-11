const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    optimizeFonts: true,
    reactRoot: true,
  },
  pwa: {
    dest: 'public',
  },
  images: {
    domains: process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(','),
    formats: ['image/avif', 'image/webp'],
  },
});
