const CACHE_NAME = "github-repos-cache-v1";

self.addEventListener("install", (event) => {
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
});

let offlineMode = false;

self.addEventListener("fetch", (event) => {
    const { request } = event;

    // ✅ Detect GitHub API requests and cache them
    if (request.url.includes("api.github.com")) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return fetch(request)
                    .then((response) => {
                        cache.put(request, response.clone()); // ✅ Cache API response
                        return response;
                    })
                    .catch(() => cache.match(request)); // ✅ Serve cached response if offline
            })
        );
        return;
    }

    // ✅ Block all other network requests if offline
    if (offlineMode) {
        event.respondWith(new Response("Offline Mode Enabled", { status: 503 }));
    }
});

self.addEventListener("message", (event) => {
    if (event.data.type === "GO_OFFLINE") {
        offlineMode = true;
        console.log("🚨 Service Worker: Now in Offline Mode");
    } else if (event.data.type === "GO_ONLINE") {
        offlineMode = false;
        console.log("✅ Service Worker: Back Online");
    }
});
