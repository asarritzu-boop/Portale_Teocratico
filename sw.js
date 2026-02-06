const CACHE_NAME = 'portale-teocratico-v1';
const assets = [
  './',
  './index.html',
  './icona-512.png',
  './icona-192.png',
  './anagrafica.png',
  './discorsi.png',
  './rapporto.png',
  './tabella.png',
  './giochi.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
