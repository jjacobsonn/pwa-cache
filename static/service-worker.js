const CACHE_NAME = 'trending-repos-cache-v1'; // Update cache name for versioning
const OFFLINE_URL = '/offline.html'; // Optionally serve a custom offline page

// Install event: Pre-cache essential resources
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching offline resources');
      return cache.addAll([
        OFFLINE_URL, // Include an offline fallback page if available
      ]);
    })
  );
  self.skipWaiting(); // Immediately activate the Service Worker
});

// Activate event: Cleanup old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[ServiceWorker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim(); // Take control of all clients immediately
});

// Fetch event: Handle online and offline requests
self.addEventListener('fetch', (event) => {
  // For navigation requests, serve the offline page if offline
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // For other requests, attempt to serve from cache, then fallback to network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then((response) => {
            // Cache new requests dynamically
            if (event.request.method === 'GET') {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          })
          .catch((error) => {
            console.error(
              `[ServiceWorker] Fetch failed for ${event.request.url}:`,
              error
            );
            throw error;
          })
      );
    })
  );
});

// Listen for messages from the client to toggle offline mode
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'offline') {
    console.log('[ServiceWorker] Offline mode enabled');
    // Simulate offline by ignoring fetch requests (for demo purposes)
  } else if (event.data && event.data.type === 'online') {
    console.log('[ServiceWorker] Online mode enabled');
    // Restore fetch handling
  }
});
