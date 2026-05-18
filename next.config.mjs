/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  
  // Minimize bundle size
  swcMinify: true,
  
  // Image optimization (cached at edge)
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.redd.it',
      },
      {
        protocol: 'https',
        hostname: '*.redditmedia.com',
      },
      {
        protocol: 'https',
        hostname: 'i.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'v.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
      }
    ],
  },
  
  // Remove console.logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  
  // Aggressive caching for static assets
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
