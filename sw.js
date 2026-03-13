const CACHE_NAME = 'portale-teocratico-v2';
const assets = [
  './',
  './index.html',
  './icona-512.png',
  './icona-192.png',
  './anagrafica.png',
  './discorsi.png',
  './rapporto.png',
  './tabella.png',
  './giochi.png',
  './ODG.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
