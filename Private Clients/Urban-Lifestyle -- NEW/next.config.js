/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const isProd = () => process.env.NODE_ENV === 'production';

const nextConfig = withPWA({
  reactStrictMode: true,
  distDir: 'build', //build folder
  poweredByHeader: false, //the x-powered-by header.

  target: 'experimental-serverless-trace', //this is for offline capable firebase firestore

  // i18n: {
  //   locales: ['en', 'nl'],
  //   defaultLocale: 'en',
  //   localeDetection: false,
  // },
  pwa: {
    disable: !isProd(),
    dest: 'public',
    register: true,
    skipWaiting: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  images: {
    unoptimized: true,
    domains: [process.env.NEXT_PUBLIC_DOMAIN],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365, //Time to Live (TTL) in seconds for cached optimized images Non static images
    loader: 'custom',
    loaderFile: './utils/ImageLoader.js',
  },
});

module.exports = nextConfig;
