const CACHE_NAME = "yo-nunca-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/frases.json",
  "/manifest.json",
  "/icons/logo-192.png",
  "/icons/logo-512.png"
];

// Instala el service worker y guarda archivos en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Carga desde caché si está disponible
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
