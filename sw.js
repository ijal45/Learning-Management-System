const CACHE_NAME = "tav-smkn3-surabaya-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/script.js",
  "/LOGO-SMK.png",
  "/1.jpeg",
  "/3.jpeg",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png",
  "/9.png",
  "/Macam-macam Komponen.pdf",
  "https://unpkg.com/aos@2.3.1/dist/aos.css",
  "https://unpkg.com/aos@2.3.1/dist/aos.js",
];

// Install Service Worker and cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event to serve cached content
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached response if available
        if (response) {
          return response;
        }
        // Fetch from network if not in cache
        return fetch(event.request).then((networkResponse) => {
          // Cache new resources dynamically
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        });
      })
      .catch(() => {
        // Fallback for offline
        return caches.match("/index.html");
      })
  );
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
