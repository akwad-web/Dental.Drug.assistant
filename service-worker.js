/* =================================================================
   service-worker.js — Offline caching (cache-first, network fallback)
   ================================================================= */
const VERSION = "ddds-v1.0.0";
const CACHE = VERSION + "-static";

// Files to pre-cache for full offline use. Relative to the SW scope.
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/embedded-data.js",
  "./js/i18n.js",
  "./js/db.js",
  "./js/engine.js",
  "./js/calculators.js",
  "./js/interactions.js",
  "./js/prescription.js",
  "./js/history.js",
  "./js/admin.js",
  "./js/app.js",
  "./js/pwa.js",
  "./database/drugs.json",
  "./database/diagnoses.json",
  "./interactions/interactions.json",
  "./guidelines/guidelines.json",
  "./calculators/calculators.json",
  "./rules/prescribing-rules.json",
  "./translations/en.json",
  "./translations/ar.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // don't cache cross-origin

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      // cache-first for speed/offline; fall back to network
      return cached || network;
    })
  );
});
