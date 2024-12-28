const { generateSW } = require('workbox-build');

generateSW({
  globDirectory: 'static',
  globPatterns: ['**/*.{html,js,css,png,svg,json,woff,woff2,ttf}'], // Include all critical file types
  swDest: 'static/sw.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/github-trending-api\.de\.a9sapp\.eu\/repositories/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'trending-repos-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
        },
        cacheableResponse: {
          statuses: [0, 200], // Cache opaque responses as well
        },
      },
    },
    {
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-cache',
        expiration: {
          maxEntries: 100, // Increase entries if needed
          maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 1 week
        },
        cacheableResponse: {
          statuses: [0, 200], // Ensure opaque responses are cached
        },
      },
    },
    {
      urlPattern: ({ url }) => url.pathname.endsWith('.png') || url.pathname.endsWith('.jpg'),
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
        },
      },
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
}).then(({ count, size }) => {
  console.log(`Generated a new service worker, precaching ${count} files, totaling ${size} bytes.`);
}).catch(console.error);
