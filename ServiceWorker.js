const cacheName = "DefaultCompany-Dressing-0.1.0";
const contentToCache = [
    "Build/82d8e3d39639674b6fa9636b9455f08f.loader.js",
    "Build/ca2f1b4c00024a205d19829be565a892.framework.js",
    "Build/2a8f6d0db4cad60c4024ff845f04e607.data",
    "Build/6a81ee25c4cbd147ceb0cc979502eb35.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
