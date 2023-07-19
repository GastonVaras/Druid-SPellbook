const CACHE_NAME = "buscador-de-hechizos-cache-v1";
const urlsToCache = [
  "/", // La página de inicio
  "/index.html",
  "/style/sass.css/",
  "/javascript/script.js",
  "/javascript/spells.js",
  // Agrega aquí los demás archivos que deseas cachear, como los iconos, imágenes, etc.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});