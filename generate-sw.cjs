const { generateSW } = require("workbox-build");

generateSW({
  globDirectory: "static",
  globPatterns: ["**/*.{html,js,css,png,svg,json}"],
  swDest: "static/sw.js",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/github-trending-api\.de\.a9sapp\.eu\/repositories/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "trending-repos-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // Cache for 1 day
        },
      },
    },
    {
      urlPattern: ({ url }) => url.origin === self.location.origin,
      handler: "CacheFirst",
      options: {
        cacheName: "static-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60, // Cache for 1 week
        },
      },
    },
  ],
}).then(({ count, size }) => {
  console.log(`Generated a new service worker, which will precache ${count} files, totaling ${size} bytes.`);
}).catch(console.error);