const { generateSW } = require('workbox-build');

generateSW({
  globDirectory: ".svelte-kit/output/client", // Directory for client-side files
  globPatterns: ["**/*.{html,js,css,png,svg,json}"], // File types to cache
  swDest: "static/sw.js", // Output service worker to static directory
  runtimeCaching: [
    {
      // Cache API responses
      urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/posts/,
      handler: "NetworkFirst", // Fetch fresh data first, fallback to cache
      options: {
        cacheName: "api-cache",
        expiration: { maxEntries: 50, maxAgeSeconds: 24 * 60 * 60 }, // Cache for 1 day
      },
    },
    {
      // Cache static assets
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: "CacheFirst", // Serve from cache first for static assets
      options: {
        cacheName: "static-cache",
        expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 }, // Cache for 7 days
      },
    },
  ],
}).then(({ count, size }) => {
  console.log(`Generated a service worker with ${count} files, totaling ${size} bytes.`);
}).catch(console.error);
